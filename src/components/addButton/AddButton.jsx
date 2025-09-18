import React from "react";
import './AddButton.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; 

export default function ButtonAdd( {onClick}) {
    return(
        <button className="add" onClick={onClick}>
            <FontAwesomeIcon icon={faPlus} className="faPlus"/>        
        </button>

    );
}