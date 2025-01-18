import { useState } from 'react';
import './TagImages.css';
import { Button } from '@material-tailwind/react';
import CongurationPopup from '../../Ui-Components/CongurationPopup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Header from '../../Commons/Header';


const TagImages = () => {
    // Boxes information for the dashboard area
    const boxes = [
        { iconSrc: "Assets/Images/All Icons/Group 101.svg", value: "15", text: "Images Tagged" },
    ];

    const images = [
        "Assets/Images/Rateimages/18 - Ripley.png",
        "Assets/Images/Explore/37 - Jin and Jang.png",
        "Assets/Images/generate/42-Borum,The-Bloodsworn.png",
        "Assets/Images/generate/4 - Dream Totem.png",
        "Assets/Images/generate/48 - Star Ram.png",
    ];

    const [tags, setTags] = useState(Array(5).fill("")); // Initial tags
    const [popupVisible, setPopupVisible] = useState(false);
    const [alertPopupVisible, setAlertPopupVisible] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [currentImage, setCurrentImage] = useState(images[0]);

    const isValidTag = (tag) => /^[a-z]+$/.test(tag); // Validates lowercase words

    const handleChange = (index) => (e) => {
        const newValue = e.target.value.toLowerCase();
        if (isValidTag(newValue)) {
            setTags((prevTags) => {
                const updatedTags = [...prevTags];
                updatedTags[index] = newValue;
                return updatedTags;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default behavior (refresh)

        if (clickCount < 5) {
            setPopupVisible(true); // Show the popup
            setTimeout(() => {
                setPopupVisible(false); // Hide the popup after 2 seconds
                setClickCount((prevCount) => prevCount + 1); // Increment the click count
                // Make sure `clickCount` doesn't exceed the array length
                if (clickCount + 1 < images.length) {
                    setCurrentImage(images[clickCount + 1]); // Update the current image
                }
            }, 2600); // Delay before hiding the popup
        } else {
            setAlertPopupVisible(true); // Trigger an alert if limit is reached
        }

        // Clear the tag input after submission
        setTags(Array(5).fill("")); // Reset the tags
    };

    return (
        <>
            <div className="">
                <nav className='h-14 lg:h-auto mb-6 md:mb-12 lg:mb-0 2xl:mb-0'>
                    <div className="lg:relative md:absolute top-0 w-full z-[999]">
                        <Header title={'Tag Images'}  />
                    </div>
                </nav>
                <div className='mb-10 2xl:mb-0 relative'>
                    <div className="p-6 pt-0 md:px-16 2xl:px-[100px]">
                        <div className="sm-hidden md:block">
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
                        </div>
                        <div className="TagImages-content md:mt-8 lg:mt-10 2xl:mt-14 grid grid-cols-12 gap-4 lg:gap-5 2xl:gap-6 mb-8 lg:mb-0">
                            <div className="col-span-12 lg:col-span-8  md:col-span-6 ">
                                <h3 className="text-40 ">Tag the image below</h3>
                                <div>
                                    <img className="w-full mt-4 2xl:mt-8 tag-images-gen rounded-xl" src={currentImage} alt="Current Image" /> {/* Updated image */}
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="Form col-span-12 md:col-span-6  lg:col-span-4 md:px-3 2xl:w-full lg:px-0 md:bg-transparent mt-0 md:py-0 tag-form">
                                <div className="">
                                    <p className="mb-4 2xl:mb-8">Write 5 words you associate with this image. All lowercase, no symbols or spaces.</p>
                                    {tags.map((tag, index) => (
                                        <input
                                            key={index}
                                            className="input-custom"
                                            type="text"
                                            placeholder={`Enter Tag ${index + 1}`}
                                            value={tag}
                                            onChange={handleChange(index)}
                                            required
                                        />
                                    ))}
                                </div>
                                <Button type="submit" className="sub-button mt-4">
                                    Confirm
                                </Button>
                            </form>
                            {popupVisible && ( /* Congratulatory popup */
                                <CongurationPopup />
                            )}
                            {alertPopupVisible && ( /* Alert popup if limit is reached */
                                <Dialog open={alertPopupVisible} onClose={() => setAlertPopupVisible(false)}>
                                    <DialogContent className="text-center bg-[#2C2E2E] w-full">
                                        <h2 className='text-red-800 text-4xl font-bold'>Limit Reached</h2>
                                        <p className='text-white text-lg py-4'>You can only tag five times.</p>
                                        <Button className='py-2'
                                            onClick={() => setAlertPopupVisible(false)}
                                            variant="contained"
                                            style={{ backgroundColor: '#414545', color: '#fff', borderRadius: '20px', marginTop: '1rem' }}
                                        >
                                            Close
                                        </Button>

                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TagImages;
