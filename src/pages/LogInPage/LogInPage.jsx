import React, { useState } from 'react';
import './LogInPage.css';
import LogInModal from "../../components/logInModal/LogInModal";
import SignInModal from '../../components/signInModal/SignInModal';
import {useNavigate} from 'react-router-dom';

export default function LogInPage() {
    const [activeModal, setActiveModal] = useState('login');
    const navigate = useNavigate(); 

    const handleCloseModal = () => {
        setActiveModal(null);
    };

    const handleLoginSuccess = (userData) => {
        console.log('Login exitoso:', userData);
        handleCloseModal();
        navigate('/');
    };

    const handleRegisterSuccess = (userData) => {
        console.log('Registro exitoso:', userData);
        handleCloseModal();
        navigate('/');
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