import { useState, useEffect } from 'react';
// import './PopupStyles.css'; // Ensure your CSS is properly imported

const CongurationPopup = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        // Show the popup when the component mounts
        setIsPopupVisible(true);

        const timer = setTimeout(() => {
            setIsPopupVisible(false); // Hide the popup after 2 seconds
        }, 1700);

        // Cleanup to prevent memory leaks
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div>
            {/* Correctly use template literals for dynamic class names */}
            <div className="popup-overlay">
                <div className={`popupbagde px-4 py-2 lg:px-7 lg:py-7 2xl:px-8 2xl:py-8 ${isPopupVisible ? 'show' : 'hide'}`}>
                    <div className="mx-auto flex items-center gap-2 justify-center">
                        <div className="bg-[#0E6400] rounded-[50%] p-3">
                            <img className="md:h-9 2xl:h-10 md:w-9 2xl:w-10" src="Assets/Images/All Icons/Group 90.svg" alt="Icon" />
                        </div>
                        <div>
                            <h3>Congratulations!</h3>
                            <p>You Earned 10 $Dream</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CongurationPopup;
