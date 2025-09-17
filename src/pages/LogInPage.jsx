import React, { useState } from 'react';
import './LogInPage.css';
import LogInModal from "../components/logInModal/LogInModal";
import SignInModal from '../components/signInModal/SignInModal';

export default function LogInPage() {
    const [activeModal, setActiveModal] = useState('login');

    const handleCloseModal = () => {
        setActiveModal(null);
    };

    const handleLoginSuccess = (userData) => {
        console.log('Login exitoso:', userData);
        handleCloseModal();
        // Lógica de redirección a la home
    };

    const handleRegisterSuccess = (userData) => {
        console.log('Registro exitoso:', userData);
        setActiveModal('login');
    };

    const handleGoToRegister = () => {
        setActiveModal('signin');
    };

    const handleGoToLogin = () => {
        setActiveModal('login');
    };

    return (
        <div className="log-in__page">
            {activeModal === 'login' && (
                <LogInModal
                    onClose={handleCloseModal}
                    onLoginSuccess={handleLoginSuccess}
                    onGoToRegister={handleGoToRegister}
                />
            )}

            {activeModal === 'signin' && (
                <SignInModal
                    onClose={handleCloseModal}
                    onSuccess={handleRegisterSuccess}
                    onGoToLogin={handleGoToLogin}
                />
            )}
        </div>
    );
}