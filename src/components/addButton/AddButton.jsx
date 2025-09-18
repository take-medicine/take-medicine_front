import React, {useState} from "react";
import './AddButton.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; 
import ModalOptions from "../modalOptions/ModalOptions";

export default function ButtonAdd( {onGoToTreatment, onGoToReminder}) {
    const [openModal, setOpenModal] = useState(false);
    
    return(
     <>
        <button className="add" onClick={() => setOpenModal(true)}>
            <FontAwesomeIcon icon={faPlus} className="faPlus"/>        
        </button>

        {openModal && (
            <ModalOptions onClose={() => setOpenModal(false)} onGoToTreatment={() => {
                onGoToTreatment();
                setOpenModal(false);
              }} onGoToReminder={() => {
                onGoToReminder();
                setOpenModal(false);
              }}
            />
        )}
     </>
    );
}