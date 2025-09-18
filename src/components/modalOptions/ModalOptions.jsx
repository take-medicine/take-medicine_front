import React from 'react';
import './ModalOptions.css';

export default function ModalOptions({onGoToTreatment, onGoToReminder, onClose}) {
    return(
        <div className="modal-options__overlay" onClick={onClose}>
            <div className="modal-options__container" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <div className="modal-options__actions">
                    <button type="button" className="modal-options__link" onClick={onGoToTreatment}>Añadir tratamiento</button>
                    <button type="button" className="modal-options__link" onClick={onGoToReminder}>Añadir recordatorio</button>
                </div>
            </div>
        </div>
    );
}