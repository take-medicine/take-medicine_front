import React from 'react';
import './ModalOptions.css';

export default function ModalOptions({onGoToTreatment, onGoToReminder}) {
    return(
        <div className="modal-options__overlay">
            <div className="modal-options__container" role="dialog" aria-modal="true">
                <div className="modal-options__actions">
                    <button type="button" className="modal-options__link" onClick={onGoToTreatment}>Añadir tratamiento</button>
                    <button type="button" className="modal-options__link" onClick={onGoToReminder}>Añadir recordatorio</button>
                </div>
            </div>
        </div>
    );
}