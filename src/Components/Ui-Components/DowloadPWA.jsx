import { Button } from "@material-tailwind/react";
import { useEffect, useState } from 'react';

const DownloadPWA = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default behavior
      e.preventDefault();
      console.log("Before install prompt triggered");

      // Store the event so it can be used later
      setInstallPromptEvent(e);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    // Check if the device is mobile based on the window width
    const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

    if (isMobile && installPromptEvent) {
      // Trigger the prompt automatically for mobile devices
      console.log("Mobile device detected, triggering prompt");
      handleInstallPWA();
    }
  }, [installPromptEvent]);

  const handleInstallPWA = async () => {
    if (installPromptEvent) {
      console.log("Prompting for installation");
      // Show the install prompt
      installPromptEvent.prompt();

      const { outcome } = await installPromptEvent.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Do not set installPromptEvent to null
      // It remains available for the button to use again
    } else {
      console.warn("Install prompt event not available");
    }
  };

  // Function to determine if the device is desktop
  const isDesktop = () => {
    return window.innerWidth > 768;
  };

  return (
    <div>
      {isDesktop() && (
        <div className="md:hidden lg:block">
          <Button className='pwa-download' onClick={handleInstallPWA}>
            <img src="Assets/Images/All Icons/Group 115.svg" alt="Download App" />
            Download App
          </Button>
        </div>
      )}
      <div className="lg:hidden">
        <a
          href="#"
          onClick={handleInstallPWA}
          className="text-blue-500 text-sm font-bold no-underline transition-colors duration-300 ease-in-out hover:text-blue-700"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default DownloadPWA;
