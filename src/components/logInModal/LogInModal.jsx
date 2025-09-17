import React from "react";
import './LogInModal.css';
import InputField from "../../inputField/InputField";

export default function LogInModal() {
    return(
        <div className="log-in__modal">
            <div className="log-in__tilte">
                <h2>Iniciar sesión</h2>
            </div>
            <div className="log-in__fields">
                <InputField 
                type="Correo electrónico"
                placeholder="Ej.: correo@correo.com"/>
                <InputField 
                type="Contraseña"
                placeholder="Ej.: correo@correo.com" />
            </div>
        </div>
    );
}