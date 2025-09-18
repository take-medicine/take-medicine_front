import React from "react";
import './TreatmentDetails.css';

export default function TreatmentDetails( { treatment, onClose }) {
return(
    <div className="treatment-details__overlay" onClick={onClose}>
        <div className="treatment-details__container" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="treatment-details__name">
            <h3></h3>
        </div>
        </div>
    </div>
);

}