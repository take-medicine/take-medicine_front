import React from "react";
import './CardResume.css'

export default function CardResume({medicineName, dosage, time, onClick }) {
    return(
    <>
    <div className="medication-card" onClick={onClick}>
      <div className="medication-card__content">
        <span>{medicineName}</span>
        <span>|</span>
        <span>{dosage}</span>
        <span>|</span>
        <span>{time}</span>
      </div>
    </div>
    </>
    );
}