import React from "react";
import "./calendar.css";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const Calendar = ({ selectedDate, onDateChange, medications}) => {
    const tileClassName = ({ date, view}) => {
        if (view === "month") {
            const DateStr =date.toISOString().split("T")[0];
            if (medications[DateStr]) {
                return "has-medication";
            }
        }
        return null;
    };

    return (
        <div className="cal-container">
            <ReactCalendar
            onClickDay={onDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            />
        </div>
    );
};

export default Calendar;