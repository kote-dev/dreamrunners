import { Link } from "react-router-dom";
import "./explore.css";
import { Button } from "@material-tailwind/react";
import BreadCrum from "./BreadCrum";
const generateEdit = () => {
    const buttons = [
        { id: 1, label: "Upscale (Subtle)", link: "#", icon: "Assets/Images/All Icons/Group 85b.svg" },
        { id: 2, label: "Upscale (Creative)", link: "#", icon: "Assets/Images/All Icons/Group 85b.svg" },
        { id: 3, label: "Vary (Subtle)", link: "#", icon: "Assets/Images/All Icons/Group 86.svg" },
        { id: 4, label: "Vary (Strong)", link: "#", icon: "Assets/Images/All Icons/Group 86.svg" },
    ];
    return (
        <>
            <div className=" ">
            <BreadCrum 
                buttonText="Submit" 
                placeholder="Name your piece" 
                suggestionButtons={["Character", "Environment", "Game Design", "Item", "Card"]} 
                dropdownOptions={false}
            />
                <div className=" p-6 md:px-16 2xl:px-[100px] h-full">
                    <p className="generate-img-text mb-6 lg:mb-9 2xl:mb-12 2xl:mt-4">a large illustrative background showing simple and minimalistic ancient statues, symmetrical, light grey and blue color palette high resolution, high contrast, cinematic, mysterious atmosphere, clean, alien atmosphere --ar 2:1 --s 250 --v 6.0 - <span className="text-[#AEAEAE] text-base">by</span>  <span className='bg-[#2C2E2E] rounded-3xl py-1 px-3 text-white text-sm'>
                        @Flook
                    </span> </p>
                    <div className="grid grid-cols-12 gap-6 pb-24 lg:pb-0 2xl:pb-0">
                        <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
                            <img className="w-full" src="Assets/Images/generate/4 - Dream Totem.png" alt="" />
                        </div>
                        <div className="col-span-12 lg:col-span-5 2xl:col-span-4">
                            <ul className="regenerate-box-btn">
                                {buttons.map((button) => (
                                    <li
                                        key={button.id}
                                        className="bg-[#2C2E2E] rounded-2xl flex items-center  h-16 2xl:h-24 w-full hover:bg-[#3A3B3B] mb-4 2xl:mb-6"
                                    >
                                        <Link className="w-full" to={button.link}>
                                            <Button className="flex items-center gap-4 2xl:gap-6 h-full w-full">
                                                <img src={button.icon} alt={button.label} className="h-6 w-6 lg:h-8 2xl:h-10 lg:w-8 2xl:w-10" />
                                                {button.label}
                                            </Button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default generateEdit
