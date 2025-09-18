import React, { useState, useEffect } from 'react';
import './CurrentTreatment.css';
import CardResume from '../cardResume/CardResume.jsx';
import TreatmentDetails from '../treatmentDetails/TreatmentDetails';

export default function CurrentTreatment({ userId }) {
    const [medications, setMedications] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchCurrentMedications = async () => {
          setLoading(true);
          try {
            const response = await fetch(`/api/users/${userId}/medications`); 
            if (!response.ok) {
              throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            setMedications(data);   // array from backend
          } catch (error) {
            console.error('Error al obtener las medicaciones:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (userId) {
          fetchCurrentMedications();
        }
      }, [userId]);
    
      const handleCardClick = (medication) => {
        setSelectedMedication(medication);
      };
    
      const handleCloseModal = () => {
        setSelectedMedication(null);
      };
    
      if (loading) {
        return (
          <div className="widget-container">
            <div className="loading-message">Cargando medicaciones...</div>
          </div>
        );
      }
    
      if (medications.length === 0) {
        return (
          <div className="widget-container">
            <p>No hay tratamientos asignados</p>
          </div>
        );
      }
    
  
      return (
        <div className="widget-container">
          <div className="widget-header">
            <h3 className="widget-title">Medicación actual</h3>
            <span className="widget-count">
              {medications.length} medicamento{medications.length !== 1 ? 's' : ''}
            </span>
          </div>
    
          <div className="medication-list">
            {medications.map((medication) => (
              <CardResume
                key={medication.id}
                medicineName={medication.medicationName}
                dosage={medication.dosage}
                time={medication.time[0]}
                onClick={() => handleCardClick(medication)}
              />
            ))}
          </div>
    
          {selectedMedication && (
            <TreatmentDetails
              treatment={selectedMedication}
              onClose={handleCloseModal}
            />
          )}
        </div>
      );
}
