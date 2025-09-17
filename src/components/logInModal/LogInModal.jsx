import React, { useState } from "react";
import './LogInModal.css';
import InputField from "../../inputField/InputField";
import Button from '../button/Button';

export default function LogInModal({ onClose, onLoginSuccess, onGoToRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage('');

        if (!email || !password) {
            setMessage('Por favor, rellena todos los campos.');
            return;
        }

        setIsLoading(true);

        try {
            // Líneas comentadas para la conexión con el backend
            // const response = await fetch('https://tu-api.com/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password }),
            // });

            // const data = await response.json();

            // if (response.ok) {
            //     onLoginSuccess(data);
            // } else {
            //     setMessage(data.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
            // }

            // Simulación de un proceso de carga
            setTimeout(() => {
                setMessage('Conexión con el backend comentada. ¡Formulario listo!');
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            setMessage('No se pudo conectar con el servidor.');
            setIsLoading(false);
        }
    };



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
            <div className="log-in__buttons">
                <Button variant="primary">Continuar</Button>
            </div>
            <div className="log-in__footer">
                                <span className="log-in__footer-text">
                                    Si no tienes cuenta,{' '}
                                    <button
                                        type="button"
                                        className="register-link"
                                        onClick={onGoToRegister}>
                                        regístrate aquí
                                    </button>
                                </span>
                            </div>
        </div>
    );
}