import React from 'react';
import './HistoryCard.css';

const HistorialTratamientos = ({ 
  tratamientos = [], 
  onClickTratamiento, 
  className = "",
  loading = false,
  error = null,
  size = "normal", // small, normal, large
  theme = "orange" // orange, blue, green, purple
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
      
      // Reemplaza con tu endpoint real
      const response = await fetch('/api/tratamientos');
      
      if (!response.ok) {
        throw new Error('Error al cargar los tratamientos');
      }
      
      const data = await response.json();
      setTratamientos(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tratamientos:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTratamientos();
  }, []);

  return { tratamientos, loading, error, refetch: fetchTratamientos };
};

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
      // Aquí puedes navegar a otra página, abrir modal, etc.
      // router.push(`/tratamiento/${tratamiento.id}`);
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

// Componente de ejemplo para desarrollo
const EjemploHistorial = () => {
  const tratamientosEjemplo = [
    {
      id: 1,
      medicamento: "Zoomig",
      condicion: "Migrañas",
      tipo: "Crónico",
      fechaInicio: "2024-01-15",
      fechaFin: "2024-02-28",
      estado: "completado"
    },
    {
      id: 2,
      medicamento: "Ibuprofeno",
      condicion: "Dolor",
      tipo: "Agudo",
      fechaInicio: "2024-03-01",
      fechaFin: null,
      estado: "activo"
    }
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Componente Historial de Tratamientos
      </h1>
      
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Ejemplo normal */}
        <HistorialTratamientos 
          tratamientos={tratamientosEjemplo}
          onClickTratamiento={(t) => alert(`Seleccionado: ${t.medicamento}`)}
        />
        
        {/* Ejemplo cargando */}
        <HistorialTratamientos 
          loading={true}
          theme="blue"
        />
        
        {/* Ejemplo vacío */}
        <HistorialTratamientos 
          tratamientos={[]}
          theme="green"
          size="small"
        />
      </div>
    </div>
  );
};

export default HistorialTratamientos;
export { EjemploHistorial };