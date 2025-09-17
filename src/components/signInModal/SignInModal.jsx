import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './SignInModal.css';
import InputField from "../inputField/InputField";
import Button from "../button/Button";

export default function SignInModal({ onClose, onSuccess, onGoToLogin }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    const password = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage('');

        try {
            console.log('Datos de registro:', data);
            
            // Preparar FormData para envío con imagen
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            // Aquí irá tu llamada al backend
            /*
            const response = await fetch('https://tu-api.com/register', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                onSuccess(result);
            } else {
                setMessage(result.message || 'Error al registrarse. Inténtalo de nuevo.');
            }
            */

            // Simulación temporal 
            setTimeout(() => {
                onSuccess({ 
                    name: data.name, 
                    email: data.email,
                    id: Date.now() // ID simulado
                });
            }, 1500);

        } catch (error) {
            console.error("Error al procesar el formulario:", error);
            setMessage('No se pudo conectar con el servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="signin-modal" onClick={onClose}>
            <div className="signin-modal__content" onClick={e => e.stopPropagation()}>
                <div className="signin-modal__title">
                    <h2>Regístrate</h2>
                </div>

                {message && (
                    <div className={`signin-modal__message ${message.includes('exitoso') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="signin-modal__form">
                    
                    <div className="signin-modal__form-body">
                        {/* Upload image */}
                        <div className="signin-modal__image-section">
                            <label className="signin-modal__image-label">
                                {preview ? (
                                    <img src={preview} alt="Vista previa de la imagen" className="signin-modal__image" />
                                ) : (
                                    <div className="signin-modal__image-placeholder">
                                        <div>📁</div>
                                        <span>Seleccionar imagen</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image", { 
                                        required: "La imagen es obligatoria" 
                                    })}
                                    onChange={handleImageChange}
                                    className="signin-modal__image-input"
                                />
                            </label>
                            {errors.image && (
                                <small className="error-text">{errors.image.message}</small>
                            )}
                        </div>

                        <div className="signin-modal__fields">
                            <InputField
                                label="Nombre"
                                placeholder="Ej.: Miranda López"
                                {...register("name", {
                                    required: "El nombre es obligatorio",
                                    minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                })}
                                error={errors.name?.message}
                            />  

                            <InputField
                                label="Correo electrónico"
                                placeholder="Ej.: dramiranda@email.com"
                                type="email"
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
                                label="Contraseña"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    minLength: { value: 8, message: "Mínimo 8 caracteres" }
                                })}
                                error={errors.password?.message}
                            />

                            <InputField
                                label="Confirmar contraseña"
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Debes confirmar la contraseña",
                                    validate: value => 
                                        value === password || "Las contraseñas no coinciden"
                                })}
                                error={errors.confirmPassword?.message}
                            />
                        </div>
                    </div>

                    <div className="signin-modal__buttons">
                        <Button 
                            variant="secondary" 
                            type="button" 
                            onClick={onGoToLogin}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registrando...' : 'Registrarse'}
                        </Button>
                    </div>
                </form>

                <div className="signin-modal__footer">
                    <span className="signin-modal__footer-text">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            type="button"
                            className="login-link"
                            onClick={onGoToLogin}
                        >
                            Inicia sesión aquí
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}