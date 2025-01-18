
import { useState, useEffect } from 'react';
import { Button as MTButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import CustomAlert from '../../Ui-Components/CustomAlert'; // Import the new component
import './splash.css';

const Splash = () => {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setShowAlert(true);
    }, []);

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    return (
        <div className='SplashScreenBG bg1 bg2 bg3'>
            <CustomAlert show={showAlert} onClose={handleAlertClose} />
            <div className="container mx-auto">
                <div className="flex justify-center items-center md:justify-between">
                    <img className="logo pt-12 md:pt-0 lg:pt-2" src="Assets/Images/Logo/AEON PROTOCOL.svg" alt="AEON PROTOCOL Logo" />
                </div>
                <div className="splash-mid-content">
                    <div>
                        <h1>WELCOME TO THE Dream PROTOCOL</h1>
                        <p>Harness the power of AI to bring your visions to life with Dream Protocol. Enter a world where artistry meets innovation, and every creation is a masterpiece waiting to happen. Log in to begin your artistic adventure.</p>
                        <div className="flex gap-6 justify-center sign-btn">
                            <Link to="/signIn">
                                <MTButton className="mob-btn" variant="outlined">Login</MTButton>
                            </Link>
                            <Link to="/signup">
                                <MTButton variant="outlined">Sign Up</MTButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Splash;
