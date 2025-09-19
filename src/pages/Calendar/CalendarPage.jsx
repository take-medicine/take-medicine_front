import React, { useState, useEffect } from "react";
import "./CalendarPage.css";
import Calendar from "../../components/calendar/Calendar.jsx";
import Navbar from "../../components/Navbar/Navbar";
import HistoryCard from "../../components/historyCard/HistoryCard.jsx";
import CurrentTreatment from "../../components/currentTreatment/CurrentTreatment.jsx";
import CardResume from "../../components/cardResume/CardResume.jsx";
import TreatmentDetails from "../../components/treatmentDetails/TreatmentDetails.jsx";
import ModalAddReminder from "../../components/addReminderModal/addReminderModal.jsx";
import AddButton from '../../components/addButton/AddButton.jsx';
import { authService, reminderService, medicineService } from "../../services/api";



const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState({});
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [user, setUser] = useState(null);
    const [showFloatingModal, setShowFloatingModal] = useState(false);
    const [registeredMedications, setRegisteredMedications] = useState([]);

    // Cargar usuario y sus recordatorios al inicio

    useEffect(() => {
        const loadData = async () => {
            try {
                const currentUser = authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);

                    // Cargar medicamentos y recordatorios en paralelo
                    const [userReminders, availableMedicines] = await Promise.all([
                        reminderService.getUserReminders(currentUser.id),
                        medicineService.getAll()
                    ]);

                    setReminders(userReminders);
                    setRegisteredMedications(availableMedicines); // Nuevo estado

                    // Organizar recordatorios por fecha para el calendario
                    const medicationsByDate = {};
                    userReminders.forEach(reminder => {
                        const date = new Date(reminder.createdAt).toISOString().split('T')[0];
                        if (!medicationsByDate[date]) {
                            medicationsByDate[date] = [];
                        }
                        medicationsByDate[date].push(reminder);
                    });
                    setMedications(medicationsByDate);
                }
            } catch (error) {
                console.error('Error cargando datos:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Función para agregar nuevo recordatorio
    const handleSaveReminder = async (reminderData) => {
        try {
            const newReminder = await reminderService.create(reminderData);

            // Actualizar la lista local
            setReminders(prev => [...prev, newReminder]);

            // Actualizar el calendario
            const date = new Date().toISOString().split('T')[0];
            setMedications(prev => ({
                ...prev,
                [date]: [...(prev[date] || []), newReminder]
            }));

            console.log('Recordatorio guardado:', newReminder);
        } catch (error) {
            console.error('Error guardando recordatorio:', error);
            throw error;
        }
    };

    if (loading) {
        return (
            <div className="page">
                <Navbar />
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    Cargando medicaciones...
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <Navbar />
            <div className="calendar-container">

                <div className="calendar-left">
                    <Calendar
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        medications={medications}
                    />

                    <div className="calendar-current">
                        <h2>Tomas de hoy</h2>
                        <CardResume reminders={reminders} />
                    </div>
                </div>

                <div className="calendar-right">
                    <CurrentTreatment
                        reminders={reminders}
                        onAddReminder={() => setShowAddModal(true)}
                        onAddTreatment={() => {
                            // Por ahora solo log, después implementaremos tratamientos
                            console.log('Crear tratamiento completo');
                        }}
                    />
                    <HistoryCard reminders={reminders} />
                </div>
            </div>
            {/* Botón flotante */}
            <div className="floating-button">
                <AddButton
                    onGoToReminder={() => setShowAddModal(true)}
                    onGoToTreatment={() => console.log('Crear tratamiento')}
                />
            </div>

            {/* Modal para agregar recordatorio */}
            <ModalAddReminder
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSaveReminder}
                registeredMedications={registeredMedications}
            />
        </div>
    );
};

export default CalendarPage;