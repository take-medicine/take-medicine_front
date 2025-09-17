import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './LogInModal.css';
import InputField from '../inputField/InputField';
import Button from '../button/Button';

export default function LogInModal({ onClose, onLoginSuccess, onGoToRegister }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setMessage('');
        setIsLoading(true);

        try {
            // Llamada al backend
            console.log('Datos de login:', data);
            
            // Simulación de llamada API
            /*
            const response = await fetch('https://tu-api.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            });

            const result = await response.json();

            if (response.ok) {
                onLoginSuccess(result);
            } else {
                setMessage(result.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
            }
            */

            // Simulación temporal
            setTimeout(() => {
                onLoginSuccess({ email: data.email, name: 'Usuario' });
            }, 1000);

        } catch (error) {
            console.error('Error en login:', error);
            setMessage('No se pudo conectar con el servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="log-in__modal-container" onClick={onClose}>
            <div className="log-in__modal" onClick={e => e.stopPropagation()}>
                <div className="log-in__title">
                    <h2>Iniciar sesión</h2>
                </div>

                {message && (
                    <div className={`log-in__message ${message.includes('exitoso') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="log-in__fields">
                        <InputField
                            type="email"
                            placeholder="Ej.: correo@correo.com"
                            label="Correo electrónico"
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Introduce un correo válido"
                                }
                            })}
                            error={errors.email?.message}
                        />

                        <InputField
                            type="password"
                            placeholder="••••••••"
                            label="Contraseña"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: { value: 6, message: "Mínimo 6 caracteres" }
                            })}
                            error={errors.password?.message}
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
                            onClick={onGoToRegister}
                        >
                            regístrate aquí
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}