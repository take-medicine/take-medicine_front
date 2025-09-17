import React, { useState } from "react";
import './LogInModal.css';
import InputField from "../inputField/InputField.jsx";
import Button from '../button/Button';

export default function LogInModal({ onClose, /*onLoginSuccess*/ onGoToRegister}) {
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
        /*
        try {
            waiting for backend
            const response = await fetch('https://tu-api.com/login', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ email, password }),
             });

             const data = await response.json();

             if (response.ok) {
                 onLoginSuccess(data);
                 } else {
                 setMessage(data.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
             }


        } catch (error) {
            setMessage('No se pudo conectar con el servidor.');
        } finally {
            setIsLoading(false);
        } */
    };

    return(
        <div className="log-in__modal-container" onClick={onClose}>
            <div className="log-in__modal" onClick={e => e.stopPropagation()}>
                <div className="log-in__title">
                    <h2>Iniciar sesión</h2>
                </div>
                {message && (
                    <div className={`log-in__message ${message.includes('validado') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="log-in__fields">
                        <InputField
                            type="email"
                            placeholder="Ej.: correo@correo.com"
                            label="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            type="password"
                            placeholder="••••••••"
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="log-in__buttons">
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                        </Button>
                    </div>
                </form>

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
        </div>
    );
}