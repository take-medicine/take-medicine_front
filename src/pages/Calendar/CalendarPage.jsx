import React, { useState } from "react";
import "./CalendarPage.css";
import Calendar from "../../components/calendar/Calendar.jsx"
import Navbar from "../../components/Navbar/Navbar";
import HistoryCard from "../../components/historyCard/HistoryCard.jsx";
import CardResume from "../../components/cardResume/cardResume.jsx";
import TreatmentDetails from "../../components/treatmentDetails/TreatmentDetails.jsx";

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState({

    });
    
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
                    <CardResume />
                </div>
            </div>

            <div className="calendar-right">
                <h2>Tratamiento actual</h2>
                
            
                <HistoryCard />
            </div>
        </div>
    </div>
    );
};

export default CalendarPage;