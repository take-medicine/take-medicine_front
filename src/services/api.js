
const API_BASE_URL = 'http://localhost:3000';

// Servicio de autenticación
export const authService = {
  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }
      
      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error en el login');
      }
      
      // Guardar token en localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

// Servicio de recordatorios
export const reminderService = {
  // Crear recordatorio
  create: async (reminderData) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Usuario no autenticado');

      const backendData = {
        medicationName: reminderData.medication,
        time: reminderData.times[0],
        userId: user.id
      };

      const response = await fetch(`${API_BASE_URL}/api/reminders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear recordatorio');
      }
      
      return data;
    } catch (error) {
      console.error('Error creando recordatorio:', error);
      throw error;
    }
  },

  // Obtener recordatorios del usuario
  getUserReminders: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reminders/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener recordatorios');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo recordatorios:', error);
      return [];
    }
  }
};

export const medicineService = {
  // Obtener todos los medicamentos
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`);
      if (!response.ok) throw new Error('Error al obtener medicamentos');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },

  // Crear nuevo medicamento
  create: async (medicineData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData)
      });
      
      if (!response.ok) throw new Error('Error al crear medicamento');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};