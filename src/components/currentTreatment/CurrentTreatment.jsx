import React, { useState } from 'react';
import './CurrentTreatment.css';
import CardResume from '../cardResume/CardResume.jsx';
import TreatmentDetails from '../treatmentDetails/TreatmentDetails';

export default function CurrentTreatment({ reminders = [], onAddReminder, onAddTreatment }) {
    const [selectedMedication, setSelectedMedication] = useState(null);

    const handleCardClick = (medication) => {
        setSelectedMedication(medication);
    };

    const handleCloseModal = () => {
        setSelectedMedication(null);
    };

    // Filtrar recordatorios activos (hoy)
    const todaysReminders = reminders.filter(reminder => {
        const today = new Date().toDateString();
        const reminderDate = new Date(reminder.createdAt).toDateString();
        return today === reminderDate;
    });

    return (
        <div className="widget-container">
            <div className="widget-header">
                <h3 className="widget-title">Medicación actual</h3>
                <div className="widget-actions">
                    <span className="widget-count">
                        {todaysReminders.length} recordatorio{todaysReminders.length !== 1 ? 's' : ''}
                    </span>
                    
                </div>
            </div>

            <div className="medication-list">
                {todaysReminders.length === 0 ? (
                    <div className="empty-state">
                        <p>No hay medicación programada para hoy</p>
                    </div>
                ) : (
                    todaysReminders.map((reminder) => (
                        <CardResume
                            key={reminder.id}
                            medicineName={reminder.medicationName}
                            dosage="Ver detalles"
                            time={reminder.time}
                            onClick={() => handleCardClick(reminder)}
                        />
                    ))
                )}
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