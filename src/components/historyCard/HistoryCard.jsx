import React from 'react';
import './HistoryCard.css';
import { reminderService, authService } from '../../services/api';


const HistorialTratamientos = ({ 
  tratamientos = [], 
  onClickTratamiento, 
  className = "",
  loading = false,
  error = null,
  size = "normal", 
  theme = "orange" 
}) => {

  const formatearFecha = (fecha) => {
    if (!fecha) return "Actual";
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleClick = (tratamiento) => {
    if (onClickTratamiento) {
      onClickTratamiento(tratamiento);
    }
  };

  const getContainerClasses = () => {
    let classes = 'historial-container';
    
    if (size !== 'normal') {
      classes += ` ${size}`;
    }
    
    if (theme !== 'orange') {
      classes += ` theme-${theme}`;
    }
    
    if (className) {
      classes += ` ${className}`;
    }
    
    return classes;
  };

  // Estado de carga
  if (loading) {
    return (
      <div className={getContainerClasses()}>
        <h2 className="historial-title">
          Historial de tratamientos
        </h2>
        <div className="historial-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="historial-loading-item">
              <div className="historial-loading-content">
                <div className="historial-loading-info">
                  <div className="historial-loading-line-main"></div>
                  <div className="historial-loading-line-sub"></div>
                </div>
                <div className="historial-loading-arrow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className={getContainerClasses()}>
        <h2 className="historial-title">
          Historial de tratamientos
        </h2>
        <div className="historial-error">
          <div className="historial-error-content">
            <svg className="historial-error-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="historial-error-text">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={getContainerClasses()}>
      <h2 className="historial-title">
        Historial de tratamientos
      </h2>
      
      <div className="historial-list">
        {tratamientos.map((tratamiento) => (
          <div
            key={tratamiento.id}
            onClick={() => handleClick(tratamiento)}
            className="historial-item"
          >
            <div className="historial-item-content">
              <div className="historial-item-info">
                <div className="historial-item-main">
                  <span className="historial-item-medicamento">
                    {tratamiento.medicamento || tratamiento.nombre}
                  </span>
                  <span className="historial-item-separator">|</span>
                  <span className="historial-item-condicion">
                    {tratamiento.condicion || tratamiento.indicacion}
                  </span>
                  <span className="historial-item-separator">|</span>
                  <span className="historial-item-tipo">
                    {tratamiento.tipo || tratamiento.tipoTratamiento}
                  </span>
                </div>
                
                <div className="historial-item-meta">
                  {formatearFecha(tratamiento.fechaInicio)} - {formatearFecha(tratamiento.fechaFin)}
                  {(tratamiento.estado === "activo" || tratamiento.activo) && (
                    <span className="historial-item-badge">
                      Activo
                    </span>
                  )}
                </div>
              </div>
              
              <div className="historial-item-arrow">
                <svg 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {tratamientos.length === 0 && !loading && !error && (
        <div className="historial-empty">
          <div className="historial-empty-text">
            No hay tratamientos registrados
          </div>
        </div>
      )}
    </div>
  );
};

// Hook personalizado para obtener tratamientos del backend
export const useTratamientos = () => {
  const [tratamientos, setTratamientos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchTratamientos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      
      const data = await reminderService.getUserReminders(user.id);
      
      // Convertir recordatorios a formato de tratamientos
      const tratamientosFormateados = data.map(reminder => ({
        id: reminder.id,
        medicamento: reminder.medicationName,
        condicion: 'Recordatorio',
        tipo: 'Medicación',
        fechaInicio: reminder.createdAt,
        fechaFin: null,
        activo: true
      }));
      
      setTratamientos(tratamientosFormateados);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tratamientos:', err);
    } finally {
      setLoading(false);
    }
  };
}
// Componente container que maneja el estado
export const HistorialTratamientosContainer = ({ 
  className, 
  size, 
  theme,
  onClickTratamiento 
}) => {
  const { tratamientos, loading, error } = useTratamientos();

  const handleTratamientoClick = (tratamiento) => {
    if (onClickTratamiento) {
      onClickTratamiento(tratamiento);
    } else {
      console.log('Tratamiento seleccionado:', tratamiento);
    }
  };

  return (
    <HistorialTratamientos
      tratamientos={tratamientos}
      loading={loading}
      error={error}
      onClickTratamiento={handleTratamientoClick}
      className={className}
      size={size}
      theme={theme}
    />
  );
};

export default HistorialTratamientos;
