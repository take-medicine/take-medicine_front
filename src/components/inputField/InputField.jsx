import React, {useState} from "react";
import './InputField.css';
import { EyeClosed, Eye } from 'lucide-react';

export default function InputField({ label, placeholder, type = "text", error, ...props}) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;


    return(
        <div className="input-field">
            {label && <label className="input-field__label">{label}</label>}
            <div className="input-field__wrapper">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`input-field__input ${error ? "input-error" : ""}`}
                    {...props}
                />
                
                {type === 'password' && (
                    <button 
                        type="button" 
                        className="input-field__toggle-eye" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <span className="input-field__error">{error}</span>}
        </div>
    );

}