import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../inputField/InputField";
import Button from "../button/Button";

export default function SignInModal({ onCancel, onSave }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // Observa el valor de la contraseña para validar la confirmación
    const password = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            //  "FormData" to send data to backend
            const formData = new FormData();
            formData.append("nombre", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("imagen", data.image[0]); 
            // ----------------------------------------------------------------
            //  waiting for backend 
            // ----------------------------------------------------------------
            // const response = await fetch("https://tu-api.com/register", {
            //     method: "POST",
            //     body: formData,
            // });

            // if (response.ok) {
            //     const result = await response.json();
            //     if (onSave) onSave(result);
            // } else {
            //     console.error("Error en el registro:", await response.text());
            // }
            
            // Not final-waiting for backend.
            console.log("Formulario validado, listo para el backend.");
            if (onSave) onSave(data);

        } catch (error) {
            console.error("Error al procesar el formulario:", error);
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
        <div className="signin-modal">            
            <div className="signin-modal__content">
                <div className="signin-modal__title">
                    <h2>Regístrate</h2>
                </div>

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
                            {errors.imagen && (
                                <small className="error-text">{errors.imagen.message}</small>
                            )}
                        </div>

                        {/* Campos del formulario */}
                        <div className="signin-modal__fields">
                            <InputField
                                label="Nombre"
                                placeholder="Ej.: Miranda López"
                                {...register("name", { 
                                    required: "El nombre es obligatorio",
                                    minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                })}
                                error={errors.nombre?.message}/>  

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
                                error={errors.email?.message}/>

                            <InputField
                                label="Contraseña"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "Debe contener mayúscula, minúscula y número"
                                    }
                                })}
                                error={errors.password?.message}/>

                            <InputField
                                label="Confirmar contraseña"
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Debes confirmar la contraseña",
                                    validate: value => 
                                        value === password || "Las contraseñas no coinciden"
                                })}
                                error={errors.confirmPassword?.message}/>
                        </div>
                    </div>

                    <div className="signin-modal__buttons">
                        <Button variant="secondary" type="button" onClick={onCancel}>Cancelar</Button>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Registrando...' : 'Registrarse'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}