import { useState } from 'react';
import './MyProfile.css';
import { Button } from '@material-tailwind/react';
import { RiCloseFill } from 'react-icons/ri';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Header from '../../Commons/Header';
import { Link } from 'react-router-dom';

const imageData = [
    { id: 1, src: "Assets/Images/MyProfile/10 -Thief in the Night.webp", alt: "Thief in the Night" },
    { id: 2, src: "Assets/Images/MyProfile/11_Hamhock (3).webp", alt: "Hamhock" },
    { id: 3, src: "Assets/Images/MyProfile/13 - Bristle Pig (1).webp", alt: "Bristle Pig" },
    { id: 4, src: "Assets/Images/MyProfile/14 - Kiki and her Kestrels.webp", alt: "Kiki and her Kestrels" },
    { id: 5, src: "Assets/Images/MyProfile/15_The_Anatomist (1).webp", alt: "The Anatomist" },
    { id: 6, src: "Assets/Images/MyProfile/17 - Sheira the Revered.webp", alt: "Sheira the Revered" },
    { id: 7, src: "Assets/Images/MyProfile/18 - Ripley.webp", alt: "Ripley" },
    { id: 8, src: "Assets/Images/MyProfile/2 - One-Handed Thale (5).webp", alt: "One-Handed Thale" },
    { id: 9, src: "Assets/Images/MyProfile/20 - Aisling (2).webp", alt: "Aisling" },
    { id: 10, src: "Assets/Images/MyProfile/21-TheRedKing.webp", alt: "The Red King" },
    { id: 11, src: "Assets/Images/MyProfile/22 - Necramona.webp", alt: "Necramona" },
    { id: 12, src: "Assets/Images/MyProfile/24 - Dunwalker.webp", alt: "Dunwalker" },
    { id: 13, src: "Assets/Images/MyProfile/28 - Haku Spearman.webp", alt: "Haku Spearman" },
    { id: 14, src: "Assets/Images/MyProfile/29 - Pain Eater.webp", alt: "Pain Eater" },
    { id: 15, src: "Assets/Images/MyProfile/30 - Aeon Sisters.webp", alt: "Aeon Sisters" },
    { id: 16, src: "Assets/Images/MyProfile/31- San stalker.webp", alt: "San Stalker" },
    { id: 17, src: "Assets/Images/MyProfile/5 Thorn Covered Trent.webp", alt: "Thorn Covered Trent" },
    { id: 18, src: "Assets/Images/MyProfile/50.webp", alt: "Unknown Image" },
];

const ImagePopup = ({ imageSrc, imageDetails, open, onClose }) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false} // Allows custom widths outside predefined options like "sm", "md", "lg"
            PaperProps={{
                style: {
                    width: '700px',
                    maxHeight: "500px",// Set the width to 760px
                    maxWidth: '100%', // Ensures it doesn't exceed 100% of screen width
                    backgroundColor: '#2C2E2E', // Set background color
                },
            }}
        >
            <DialogContent className="inner-img-popup w-full relative">
                <IconButton
                    className="popup-close p-1"
                    onClick={onClose}
                    style={{
                        backgroundColor: '#414545',
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                    }}
                >
                    <RiCloseFill className="text-white" />
                </IconButton>
                <img
                    className="popup-image-inner w-full" // Make image take full width of the popup
                    src={imageSrc}
                    alt="Popup"
                />
                <p className="popup-profile-text pt-3 text-white">
                    {imageDetails} a large illustrative background showing simple and minimalistic ancient statues, symmetrical, light grey and blue color palette, high resolution, high contrast, cinematic, mysterious atmosphere, clean, alien atmosphere
                    --ar 2:1 --s 250 --v 6.0
                </p>
            </DialogContent>
        </Dialog>
    );
};

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState(0); // State to track which tab is active
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageDetails, setImageDetails] = useState('');

    const openPopup = (imageSrc, details) => {
        setSelectedImage(imageSrc);
        setImageDetails(details);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedImage(null);
        setImageDetails('');
    };

    const boxes = [
        { iconSrc: "Assets/Images/All Icons/Group 64.svg", value: "100", text: "$Dream Earned" },
        { iconSrc: "Assets/Images/All Icons/Group 69.svg", value: "0", text: "Models Contributed To" },
        { iconSrc: "Assets/Images/All Icons/Group 64.svg", value: "0", text: "$Dream Slashed" },
        { iconSrc: "Assets/Images/All Icons/Group 70.svg", value: "3", text: "Nodes Owned" },
        { iconSrc: "Assets/Images/All Icons/Group 72.svg", value: "0", text: "$Dream Slashed" },
        { iconSrc: "Assets/Images/All Icons/Group 82.svg", value: "18h 37m", text: "More Ratings Unlock in" },
    ];


    // Handle tab change when a button is clicked
    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div className="">
                <div className="relative">
                    <Header title={'My Profile'} displayButton={true} />
                    {/* <div className="">
                        <Link to={'/'}>
                            <img className='md:hidden absolute top-[33.7%] right-40 z-50' src="Assets/Images/All Icons/Group 177.svg" alt="" />
                        </Link>
                    </div> */}
                    <div className=""></div>
                </div>
                <div className='mb-5'>
                    <div className="pt-0 p-6 md:px-16 2xl:px-[100px]">
                        <div className="MyProfile-content">
                            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-5 2xl:gap-6 desh-box">
                                {boxes.map((box, index) => (
                                    <div key={index} className="p-2 lg:p-3 2xl:p-4 bg-[#2C2E2E] rounded-lg lg:rounded-xl 2xl:rounded-2xl w-full">
                                        <div className="flex items-center gap-2 md:gap-3 2xl:gap-4 mb-1">
                                            <div className="rounded-md lg:rounded-lg 2xl:rounded-xl p-2 md:p-3 2xl:p-4 bg-[#222222]">
                                                <img className='h-4 md:h-8 2xl:h-10' src={box.iconSrc} alt="" />
                                            </div>
                                            <div>
                                                <p className="xs-hidden md:block">{box.text}</p>
                                                <h4>{box.value}</h4>
                                            </div>
                                        </div>
                                        <p className="sm:block md:hidden">{box.text}</p>
                                    </div>
                                ))}
                            </div>
                            <h4 className="text-18-sm mt-10 mb-6 md:hidden ">My Generations</h4>
                            <div className="myprofiletab">
                                <div className='tab-btn flex gap-2 mb-6 items-center md:mt-14 2xl:mt-[72px] lg:mb-14'>
                                    <h4 className='tab-btn-font sm-hidden text-white'>My Generations:</h4>
                                    {['Today', 'This Week', 'This Month'].map((name, index) => (
                                        <Button
                                            key={index}
                                            className={`py-[6px] lg:py-2 px-4 lg:px[18px] rounded-[20px] ${activeTab === index ? 'bg-white text-black py-[2px]' : 'bg-[#2C2E2E] text-white lg:bg-[rgba(255, 255, 255, 0.3)] tab-btn-font'
                                                }`}
                                            onClick={() => handleTabChange(index)}
                                        >
                                            {name}
                                        </Button>
                                    ))}
                                </div>
                                <div>
                                    <div className="tab-content">
                                        {activeTab === 0 && (
                                            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-img gap-0'>
                                                {imageData.map((image) => (
                                                    <img
                                                        key={image.id}
                                                        src={image.src}
                                                        alt={image.alt}
                                                        onClick={() => openPopup(image.src)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        {activeTab === 1 && (
                                            <div className='grid grid-cols-3 md:grid-cols-4  lg:grid-cols-6 grid-img gap-0'>
                                                {imageData.map((image) => (
                                                    <img
                                                        key={image.id}
                                                        src={image.src}
                                                        alt={image.alt}
                                                        onClick={() => openPopup(image.src)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        {activeTab === 2 && (
                                            <div className='grid grid-cols-3 md:grid-cols-4  lg:grid-cols-6 grid-img gap-0'>
                                                {imageData.map((image) => (
                                                    <img
                                                        key={image.id}
                                                        src={image.src}
                                                        alt={image.alt}
                                                        onClick={() => openPopup(image.src)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {popupVisible && (
                                        <ImagePopup
                                            imageSrc={selectedImage}
                                            imageDetails={imageDetails}
                                            open={popupVisible}
                                            onClose={closePopup}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;
