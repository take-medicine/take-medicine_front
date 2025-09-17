import React, { useState } from 'react';
import './LogInPage.css';
import LogInModal from "../components/logInModal/LogInModal";

export default function LogInPage() {
    const [isModalOpen, setIsModalOpen] = useState(true);

   
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLoginSuccess = () => {
        handleCloseModal();
    };

    const handleGoToRegister = () => {
        handleCloseModal();
    };

    return (
        <div className="log-in__page">
            
            {isModalOpen && (
                <LogInModal
                    onClose={handleCloseModal}
                    onLoginSuccess={handleLoginSuccess}
                    onGoToRegister={handleGoToRegister}
                />
            )}
        </div>
    );
}