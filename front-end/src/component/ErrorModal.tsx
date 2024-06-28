import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface ErrorModalProps {
    error: string;
    setError: Dispatch<SetStateAction<string>>;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, setError }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let timeout: number;

        if (error) {
            setShowModal(true);
            timeout = window.setTimeout(() => {
                setShowModal(false);
                setError("");
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [error, setError]);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="error-modal">
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ErrorModal;