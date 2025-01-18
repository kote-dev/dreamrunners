// src/Ui-Components/CustomAlert.js

import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DowloadPWA from './DowloadPWA'; // Adjust the import path as needed

const CustomAlert = ({ show, onClose }) => {
    const [alertClass, setAlertClass] = useState('');

    useEffect(() => {
        if (show) {
            setAlertClass('alert-slide-in'); // Start slide-in animation

            const timeout = setTimeout(() => {
                setAlertClass('alert-slide-out'); // Start slide-out animation
            }, 4500); // Change class after 4 seconds

            const clearTimeoutId = setTimeout(() => {
                onClose(); // Trigger onClose callback to hide alert
            }, 5000); // Total duration includes animation time

            return () => {
                clearTimeout(timeout);
                clearTimeout(clearTimeoutId);
            };
        }
    }, [show, onClose]);

    return (
        <>
            <style>
                {`
                @keyframes slideIn {
                    0% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOut {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                }

                .alert-slide-in {
                    animation: slideIn 0.5s forwards;
                }

                .alert-slide-out {
                    animation: slideOut 0.5s forwards;
                }

                .custom-alert {
                    background-color: #2C2E2E; /* Custom background color */
                    color: white; /* Custom text color */
                    border-radius: 0.5rem; /* Custom border radius */
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Custom shadow */
                    position: fixed; /* Fixed positioning */
                    top: 2%;
                    right: 5%;
                    left: 5%;
                    justify-content: center;
                    transform: translate(-50%, -50%); /* Centering trick */
                    z-index: 1000; /* Ensure it's above other content */
                    width: 90%; 
                }

                .custom-alert-title {
                    font-weight: bold; /* Bold title */
                }
                `}
            </style>

            {show && (
                <div className="lg:hidden">
                    <Alert
                        className={`custom-alert ${alertClass}`}
                        icon={false} // Remove the default icon
                    >
                        <AlertTitle className='flex gap-4 items-center custom-alert-title text-sm'>
                            <img className='h-11 rounded-lg' src="Assets/icons/android/android-launchericon-192-192.png" alt="" />
                            Dream Protocol App
                            <DowloadPWA />
                        </AlertTitle>
                    </Alert>
                </div>
            )}
        </>
    );
};

export default CustomAlert;
