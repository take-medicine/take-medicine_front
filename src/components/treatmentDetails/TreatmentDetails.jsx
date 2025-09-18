import React from "react";
import './TreatmentDetails.css';
import PillDetail from '../pillDetail/PillDetail';

export default function TreatmentDetails( { treatment, onClose }) {
    if (!treatment) {
        return null;
      }

return(
    <div className="treatment-details__overlay" onClick={onClose}>
        <div className="treatment-details__container" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3 className="treatment-details__name">{treatment.medicationName}</h3>
            <p className="treatment-details__description">{treatment.description}</p>
            <div className="treatment-details__info">
                <span className="treatment-details__subtitle">{treatment.duration}</span><span className="treatment-details__subtitle"> | </span><span className="treatment-details__subtitle">{treatment.dosage}</span>
            </div>
        <div className="treatment-details__section">
          {treatment.time.map((time, index) => (
            <PillDetail key={index} label={time} type="time" />
          ))}
        </div>

        <div className="treatment-details__section">
          <p className="treament-details__subtitle">Días de la semana</p>
          {treatment.days.map((day, index) => (
            <PillDetail key={index} label={day} type="day" />
          ))}
        </div>
        </div>
    </div>
);

}