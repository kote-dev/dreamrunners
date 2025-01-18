import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import BreadCrum from "./BreadCrum";
import "./explore.css";

const Generate = () => {
    const [loading, setLoading] = useState(true);
    const [showButtons, setShowButtons] = useState(false);

    const imageSources = [
        "Assets/Images/generate/48 - Star Ram.png",
        "Assets/Images/generate/42-Borum,The-Bloodsworn.png",
        "Assets/Images/generate/42-Borum,The-Bloodsworn.png",
        "Assets/Images/generate/46 - Chapoya.png"
    ];

    const listItems = [
        { id: 1, label: 'U1', link: '/GenerateEdit' },
        { id: 2, label: 'V1', link: '#' },
        { id: 3, label: 'U2', link: '/GenerateEdit' },
        { id: 4, label: 'V2', link: '/GenerateEdit' },
        { id: 5, label: 'U3', link: '#' },
        { id: 6, label: 'V3', link: '#' },
        { id: 7, label: 'U4', link: '/GenerateEdit' },
        { id: 8, label: 'V4', link: '/GenerateEdit' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds

        const buttonTimer = setTimeout(() => {
            setShowButtons(true);
        }, 2000); // 2 seconds

        return () => {
            clearTimeout(timer);
            clearTimeout(buttonTimer);
        };
    }, []);

    const Loader = () => (
        <div className="image-skeleton border-[#3B3F3F] border-[1px]">
            <div className="loader"></div>
        </div>
    );

    const renderImages = () => (
        <>
            {imageSources.map((src, index) => (
                <img key={index} className="image-skeleton" src={src} alt={`Image ${index + 1}`} />
            ))}
        </>
    );

    const renderSkeletons = () => (
        <>
            {imageSources.map((_, index) => (
                <Loader key={index} />
            ))}
        </>
    );

    const handleReset = (e) => {
        e.preventDefault();
        setLoading(true);
        setShowButtons(false);
        setTimeout(() => {
            setLoading(false);
            setShowButtons(true);
        }, 2500);
    };

    return (
        <div className="generate-container">
            <BreadCrum dropdownOptions={false} />
          
            <div className="p-6 2xl:pt-10 md:px-16 2xl:px-[100px]">
                <div className="generate-img pb-28 lg:pb-0 2xl:pb-0">
                    <p className="generate-img-text mb-6 lg:mb-9 2xl:mb-10">
                        a large illustrative background showing simple and minimalistic ancient statues, symmetrical, light grey and blue color palette high resolution, high contrast, cinematic, mysterious atmosphere, clean, alien atmosphere --ar 2:1 --s 250 --v 6.0 -
                        <span className="text-[#AEAEAE] text-base"> by </span>
                        <span className="bg-[#2C2E2E] rounded-3xl py-1 px-3 text-white text-sm">@Flook</span>
                    </p>

                    <div className="grid grid-cols-12 gap-6">
                        <div className="w-auto col-span-12 lg:col-span-10">
                            <div className="grid lg:grid-cols-2 grid-cols-1 w-auto">
                                {loading ? renderSkeletons() : renderImages()}
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-2">
                            <div className="flex justify-between flex-col h-full">
                                {showButtons && (
                                    <ul className="regenerate-box-btn grid grid-cols-4 lg:grid-cols-2 gap-6">
                                        {listItems.map((item) => (
                                            <li
                                                key={item.id}
                                                className="bg-[#2C2E2E] rounded-2xl flex items-center justify-center h-16 w-16 2xl:h-24 2xl:w-24 hover:bg-[#3A3B3B]"
                                            >
                                                <Link to={item.link}>
                                                    <Button className="w-full">
                                                        {item.label}
                                                    </Button>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {showButtons && (
                                    <li className="bg-[#2C2E2E] rounded-2xl flex items-center justify-center mt-6 lg:mt-0 2xl:mt-0 h-16 w-16 2xl:h-24 2xl:w-24 hover:bg-[#3A3B3B]">
                                        <a href="#" onClick={handleReset}>
                                            <img src="Assets/Images/All Icons/Group 62.svg" alt="Reset" />
                                        </a>
                                    </li>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generate;
