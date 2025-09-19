import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './LogInModal.css';
import InputField from '../inputField/InputField';
import Button from '../button/Button';
import { authService } from '../../services/api';

export default function LogInModal({ onClose, onLoginSuccess, onGoToRegister }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setMessage('');
        setIsLoading(true);

        try {
            console.log('Intentando login con:', data.email);
            
            // Llamada real al backend
            const response = await authService.login({
                email: data.email,
                password: data.password
            });

            console.log('Login exitoso:', response);
            setMessage('¡Login exitoso! Redirigiendo...');
            
            // Llamar al callback de éxito con los datos del usuario
            setTimeout(() => {
                onLoginSuccess(response.user);
            }, 1000);

        } catch (error) {
            console.error('Error en login:', error);
            
            // Mostrar mensaje de error específico
            if (error.message.includes('Credenciales inválidas')) {
                setMessage('Email o contraseña incorrectos.');
            } else if (error.message.includes('fetch')) {
                setMessage('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
            } else {
                setMessage(error.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
            }
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