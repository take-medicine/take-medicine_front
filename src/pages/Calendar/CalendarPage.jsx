import React, { useState } from "react";
import "./CalendarPage.css";
import Calendar from "../../components/calendar/Calendar.jsx"
import Navbar from "../../components/Navbar/Navbar";

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState({
        

    });
    
    return (
        <div className="calendar-container">
            <Navbar />

            <section className="calendar-topleft">
                <h2>Lib calendario</h2>
                <Calendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                medications={medications}
                />
            </section>

            <section className="calendar-bottomleft">
                <h2>Tomas de hoy</h2>
            </section>
            <section className="calendar-topright">
                <h2>Tratamiento actual</h2>
            </section>
            <section className="calendar-bottomright">
                <h2>Historial</h2>
            </section>
        </div>
    );
};

export default CalendarPage;