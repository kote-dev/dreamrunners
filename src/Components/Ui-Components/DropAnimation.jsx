import Splash from "../Pages/SplashScreen/splash";
import "./style.css";
const DropAnimationExample = () => {
    const imageSources = [
        {
            alt: "Image 2",
            src: "Assets/Images/BackgroundImages/property-1frame6-66350aba9d1d3.webp"
        },
        {
            alt: "Image 1",
            src: "Assets/Images/BackgroundImages/property-1frame3-66350ac63b586.webp"
        },
        {
            alt: "Image 2",
            src: "Assets/Images/BackgroundImages/property-1frame6-66350aba9d1d3.webp"
        },
        {
            alt: "Image 2",
            src: "Assets/Images/BackgroundImages/property-1frame61-66350aba4c4e3.webp"
        },
        {
            alt: "Image 2",
            src: "Assets/Images/BackgroundImages/property-1frame2-66350ac39a48c.webp"
        }
    ];

    return (
        <div className="relative overflow-hidden h-screen">
            <div className="animation-container">
                {/* Drop Animation 1 */}
                <div className="drop-animation drop-1">
                    <div>
                        {/* Use map to render the images */}
                        {imageSources.map((img, index) => (
                            <img key={`drop-1-${index}`} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>

                {/* Drop Animation 2 */}
                <div className="drop-animation drop-2">
                    <div>
                        {imageSources.map((img, index) => (
                            <img key={`drop-2-${index}`} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>

                {/* Drop Animation 3 */}
                <div className="drop-animation drop-3">
                    <div>
                        {imageSources.map((img, index) => (
                            <img key={`drop-3-${index}`} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>
                {/*  */}
                <div className="drop-animation sm-hidden drop-2">
                    <div>
                        {imageSources.map((img, index) => (
                            <img key={`drop-3-${index}`} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>
                {/*  */}
                <div className="drop-animation sm-hidden drop-3">
                    <div>
                        {imageSources.map((img, index) => (
                            <img key={`drop-3-${index}`} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>
                {/*  */}
                <div className="drop-animation sm-hidden md:hidden lg:block drop-2">
                    <div>
                        {imageSources.map((img, index) => (
                            <img key={`drop-3-${index}`} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>
                {/*  */}
                <div className="drop-animation sm-hidden md:hidden lg:block drop-3">
                    <div>
                        {imageSources.map((img, index) => (
                            <img key={`drop-3-${index}`} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>
            </div>
            <Splash className="" />
        </div>
    );
};

export default DropAnimationExample;
