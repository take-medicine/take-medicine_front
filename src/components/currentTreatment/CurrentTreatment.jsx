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
          const mockData = [
            {
              id: 1,
              medicationName: "Zoomig",
              dosage: "1 toma",
              time: ["09:00h"],
              description: "Medicamento para el tratamiento de migrañas. Tomar cuando aparezcan los primeros síntomas.",
              duration: "Según necesidad",
              days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
            },
            {
              id: 2,
              medicationName: "Ibuprofeno",
              dosage: "2 tomas",
              time: ["08:00h", "20:00h"],
              description: "Antiinflamatorio para el dolor y la inflamación. Tomar con alimentos.",
              duration: "7 días",
              days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
            },
            {
              id: 3,
              medicationName: "Vitamina D",
              dosage: "1 toma",
              time: ["12:00h"],
              description: "Suplemento vitamínico para fortalecer huesos y sistema inmunológico.",
              duration: "30 días",
              days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
            }
          ];
          
          setTimeout(() => {
            setMedications(mockData);
            setLoading(false);
          }, 1000);
          
        } catch (error) {
          console.error('Error fetching medications:', error);
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
          <div className="loading-message">
            Cargando medicaciones...
          </div>
        </div>
      );
    }
  
    if (medications.length === 0) {
      return null;
    }
  
    return (
      <div className="widget-container">
        <div className="widget-header">
          <h3 className="widget-title">
            Medicación actual
          </h3>
          <span className="widget-count">
            {medications.length} medicamento{medications.length !== 1 ? 's' : ''}
          </span>
        </div>
  
        <div className="medication-list">
          {medications.map(medication => (
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
