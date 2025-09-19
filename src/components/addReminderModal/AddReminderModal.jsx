import React, { useState, useEffect } from 'react';
import './AddReminderModal.css';
import Button from '../button/Button';

const ModalAddReminder = ({
    isOpen,
    onClose,
    onSave,
    editingReminder = null,
    registeredMedications = [] 
}) => {
    const [formData, setFormData] = useState({
        medication: '',
        dose: '',
        frequency: 'daily',
        times: ['09:00'],
        notes: '',
        startDate: '',
        duration: '7', // days
        remindBefore: '15' // minutes
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showNewMedication, setShowNewMedication] = useState(false);

    // Use medications passed as prop or default
    const availableMedications = registeredMedications || [];;

    const frequencyOptions = [
        { value: 'daily', label: 'Daily' },
        { value: 'every12h', label: 'Every 12 hours' },
        { value: 'every8h', label: 'Every 8 hours' },
        { value: 'every6h', label: 'Every 6 hours' },
        { value: 'every4h', label: 'Every 4 hours' },
        { value: 'custom', label: 'Custom' }
    ];

    // Load data when editing
    useEffect(() => {
        if (editingReminder) {
            setFormData({
                medication: editingReminder.medication || '',
                dose: editingReminder.dose || '',
                frequency: editingReminder.frequency || 'daily',
                times: editingReminder.times || ['09:00'],
                notes: editingReminder.notes || '',
                startDate: editingReminder.startDate || '',
                duration: editingReminder.duration || '7',
                remindBefore: editingReminder.remindBefore || '15'
            });
        } else {
            
            setFormData({
                medication: '',
                dose: '',
                frequency: 'daily',
                times: ['09:00'],
                notes: '',
                startDate: new Date().toISOString().split('T')[0], // default today
                duration: '7',
                remindBefore: '15'
            });
        }
        setErrors({});
    }, [editingReminder, isOpen]);

    // Handle input changes
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear field error
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    // Handle medication change
    const handleMedicationChange = (medicationId) => {
        if (medicationId === 'new') {
            setShowNewMedication(true);
            setFormData(prev => ({
                ...prev,
                medication: '',
                dose: ''
            }));
        } else if (medicationId) {
            const selectedMedication = availableMedications.find(
                med => med.id.toString() === medicationId
            );

            if (selectedMedication) {
                setShowNewMedication(false);
                setFormData(prev => ({
                    ...prev,
                    medication: selectedMedication.name,
                    dose: selectedMedication.dose || ''
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                medication: '',
                dose: ''
            }));
        }
    };

    const handleFrequencyChange = (newFrequency) => {
        let newTimes = ['09:00'];

        switch (newFrequency) {
            case 'every12h':
                newTimes = ['09:00', '21:00'];
                break;
            case 'every8h':
                newTimes = ['08:00', '16:00', '00:00'];
                break;
            case 'every6h':
                newTimes = ['06:00', '12:00', '18:00', '00:00'];
                break;
            case 'every4h':
                newTimes = ['06:00', '10:00', '14:00', '18:00', '22:00', '02:00'];
                break;
            default:
                newTimes = ['09:00'];
        }

        setFormData(prev => ({
            ...prev,
            frequency: newFrequency,
            times: newTimes
        }));
    };

    const addTime = () => {
        setFormData(prev => ({
            ...prev,
            times: [...prev.times, '12:00']
        }));
    };

    const removeTime = (index) => {
        if (formData.times.length > 1) {
            setFormData(prev => ({
                ...prev,
                times: prev.times.filter((_, i) => i !== index)
            }));
        }
    };

    // Update specific time
    const updateTime = (index, newTime) => {
        setFormData(prev => ({
            ...prev,
            times: prev.times.map((time, i) =>
                i === index ? newTime : time
            )
        }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.medication.trim()) {
            newErrors.medication = 'Medication name is required';
        }

        if (!formData.dose.trim()) {
            newErrors.dose = 'Dose is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (formData.times.some(t => !t)) {
            newErrors.times = 'All times must be filled';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const reminderData = {
                ...formData,
                id: editingReminder ? editingReminder.id : Date.now(),
                createdAt: new Date().toISOString()
            };

            await onSave(reminderData);
            onClose();
        } catch (error) {
            console.error('Error saving reminder:', error);
            setErrors({ submit: 'Error saving reminder' });
        } finally {
            setLoading(false);
        }
    };

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

   if (!isOpen) return null;

// Si no hay medicamentos disponibles, mostrar mensaje
if (availableMedications.length === 0) {
    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">No hay medicamentos</h2>
                    <button className="modal-close" onClick={onClose} type="button">✕</button>
                </div>
                <div className="modal-form" style={{padding: '20px', textAlign: 'center'}}>
                    <p>Primero debes crear medicamentos antes de poder crear recordatorios.</p>
                    <div className="modal-actions">
                        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
retunr (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {editingReminder ? 'Edit Reminder' : 'New Reminder'}
                    </h2>
                    <button
                        className="modal-close"
                        onClick={onClose}
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    {/* Medication - Select */}
                    <div className="form-group">
                        <label htmlFor="medication" className="form-label required">Medication</label>
                        <select id="medication"
                            className={`form-select ${errors.medication ? 'error' : ''}`}
                            value={showNewMedication ? 'new' :
                                availableMedications.find(med => med.name === formData.medication)?.id || ''}
                            onChange={(e) => handleMedicationChange(e.target.value)}
                        >
                            <option value="">Select a medication</option>
                            {availableMedications.map(medication => (
                                <option key={medication.id} value={medication.id}>
                                    {medication.name} - {medication.dose}
                                </option>
                            ))}
                            <option value="new">+ New medication</option>
                        </select>
                        {errors.medication && (
                            <div className="form-error">{errors.medication}</div>
                        )}
                    </div>

                    {/* Input for new medication */}
                    {showNewMedication && (
                        <div className="form-group">
                            <label className="form-label required">New Medication Name</label>
                            <input
                                type="text"
                                className={`form-input ${errors.medication ? 'error' : ''}`}
                                value={formData.medication}
                                onChange={(e) => handleChange('medication', e.target.value)}
                                placeholder="Ex: Omeprazole, Loratadine..."
                            />
                        </div>
                    )}

                    {/* Dose */}
                    <div className="form-group">
                        <label htmlFor="dose" className="form-label required">Dose</label>
                        <input
                            id="dose"
                            type="text"
                            className={`form-input ${errors.dose ? 'error' : ''}`}
                            value={formData.dose}
                            onChange={(e) => handleChange('dose', e.target.value)}
                            placeholder="Ex: 200mg, 1 pill..."
                        />
                        {errors.dose && (
                            <div className="form-error">{errors.dose}</div>
                        )}
                    </div>

                    {/* Frequency */}
                    <div className="form-group">
                        <label htmlFor="frequency" className="form-label">Frequency</label>
                        <div id="frequency" className="frequency-options">
                            {frequencyOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`frequency-option ${formData.frequency === option.value ? 'active' : ''}`}
                                    onClick={() => handleFrequencyChange(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Times */}
                    <div className="form-group">
                        <label htmlFor="times" className="form-label">Times</label>
                        <div className="time-inputs">
                            {formData.times.map((time, index) => (
                                <div key={index} className="time-item">
                                    <input
                                        id="times"
                                        type="time"
                                        className="form-input time-input"
                                        value={time}
                                        onChange={(e) => updateTime(index, e.target.value)}
                                    />
                                    {formData.times.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-time-btn"
                                            onClick={() => removeTime(index)}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}

                            {formData.frequency === 'custom' && (
                                <button
                                    type="button"
                                    className="add-time-btn"
                                    onClick={addTime}
                                >
                                    + Add Time
                                </button>
                            )}
                        </div>
                        {errors.times && (
                            <div className="form-error">{errors.times}</div>
                        )}
                    </div>

                    {/* Start date and duration */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="start-date" className="form-label required">Start Date</label>
                            <input
                                id="start-date"
                                type="date"
                                className={`form-input ${errors.startDate ? 'error' : ''}`}
                                value={formData.startDate}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                            />
                            {errors.startDate && (
                                <div className="form-error">{errors.startDate}</div>
                            )}
                        </div>

                        <div  className="form-group">
                            <label  htmlFor="duration" className="form-label">Duration (days)</label>
                            <input
                                id="duration"
                                type="number"
                                className="form-input"
                                value={formData.duration}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                min="1"
                                placeholder="7"
                            />
                        </div>
                    </div>

                    {/* Reminder in advance */}
                    <div className="form-group">
                        <label className="form-label">Remind Before</label>
                        <select
                            className="form-select"
                            value={formData.remindBefore}
                            onChange={(e) => handleChange('remindBefore', e.target.value)}
                        >
                            <option value="0">At the exact time</option>
                            <option value="5">5 minutes before</option>
                            <option value="15">15 minutes before</option>
                            <option value="30">30 minutes before</option>
                            <option value="60">1 hour before</option>
                        </select>
                    </div>

                    {/* Notes */}
                    <div className="form-group">
                        <label className="form-label">Notes (optional)</label>
                        <textarea
                            className="form-textarea"
                            value={formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            placeholder="Ex: Take with food, on empty stomach, etc..."
                            rows={3}
                        />
                    </div>

                    {/* Submit error */}
                    {errors.submit && (
                        <div className="form-error">{errors.submit}</div>
                    )}

                    {/* Actions */}
                    <div className="modal-actions">
                        <Button
                            variant="secondary" 
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : editingReminder ? 'Update' : 'Save'} Reminder
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddReminder;
