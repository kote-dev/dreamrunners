import { useState, useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Button } from "@material-tailwind/react";
import { RiCloseFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import "./style.css";

const UserProfile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [profileImage, setProfileImage] = useState('Assets/Images/Navbar/Ellipse 2.png'); // Initial profile image source
    const fileInputRef = useRef(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClickOpen = () => {
        setEditPopupOpen(true);
        setAnchorEl(null);
    };

    const handleEditClose = () => {
        setEditPopupOpen(false);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file');
                return;
            }

            // Read the file as a Data URL for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set the new profile image URL
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="user-profile">
            <div
                onClick={handleMenuClick}
                className="bg-transparent 2xl:bg-[#2C2E2E] lg:bg-[#2C2E2E]  2xl:w-147 rounded-[40px] 2xl:h-12 h-9 lg:w-32 p-1 2xl:p-2 flex items-center justify-between cursor-pointer"
            >
                <h5 className="2xl:ps-3 ps-2 sm-hidden">@Flook</h5>
                <img className="h-8 w-8 rounded-full" src={profileImage} alt="Profile" />
            </div>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#414545',
                        color: 'white',
                        minWidth: '200px',
                        marginTop: "2px",
                        // right: "71px",
                        left: "80%"
                    },
                }}
            >
                <MenuItem onClick={handleEditClickOpen}>
                    <img className='h-4 lg:h-6 w-auto me-2' src="Assets/Images/All Icons/Group 126.svg" alt="" /> Edit Profile Image
                </MenuItem>
                <div className="block lg:hidden 2xl:hidden">
                    <MenuItem className='' component={Link} to="/myprofile" onClick={handleMenuClose}>
                        <img className='h-4 lg:h-6 w-auto me-2' src="Assets/Images/Navbar/Ellipse 2.png" alt="" />My Profile
                    </MenuItem>
                </div>
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                    <img className='h-4 lg:h-6 w-auto me-2' src="Assets/Images/All Icons/Group 124.svg" alt="" /> Logout
                </MenuItem>
            </Menu>

            {/* Edit Profile Popup */}
            <Dialog
                open={editPopupOpen}
                onClose={handleEditClose}
                maxWidth={false}
                className='p-6 lg:p-7 pt-1'
                PaperProps={{
                    style: {
                        width: '400px',
                        maxHeight: '500px',
                        maxWidth: '100%',
                        backgroundColor: '#222222',
                    },
                }}
            >
                <DialogContent className=" w-full relative">
                    <IconButton
                        className="popup-close p-1"
                        onClick={handleEditClose}
                        style={{
                            backgroundColor: '#414545',
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                        }}
                    >
                        <RiCloseFill className="text-white" />
                    </IconButton>
                    <div className="popup-image-container w-full flex justify-center">
                        <img
                            className="popup-image-inner w-44 h-44 lg:w-56 lg:h-56 2xl:w-58 mt-4 lg:mt-6 2xl:h-58 rounded-full object-cover"
                            src={profileImage}
                            alt="User Profile"
                        />
                    </div>
                    <div className="popup-profile-text text-white text-center mt-7 lg:mt-12">
                        <Button
                            variant="contained"
                            onClick={handleUploadClick}
                            className='p-3 lg:p-6'
                            style={{
                                backgroundColor: '#ffff',
                                color: 'black',
                                fontFamily: 'Satoshi-Regular',
                                fontSize: '18px',
                                fontWeight: 700,
                                lineHeight: '24.3px',
                                width: '100%',
                            }}
                        >
                            Upload Image
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserProfile;
