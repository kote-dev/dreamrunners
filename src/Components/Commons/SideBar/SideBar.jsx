import { NavLink } from "react-router-dom";
import LogoIcon from "../../Ui-Components/LogoIcon";
import "./SideBar.css";
import { Button } from "@material-tailwind/react";

const SideBAr = () => {
  const navItems = [
    {
      to: "/explore",
      iconSrc: "Assets/Images/All Icons/Group 28.svg",
      label: "Explore",
    },
    {
      to: "/MyProfile",
      iconSrc: "Assets/Images/All Icons/Group 27.svg",
      label: "My Profile",
    },
    {
      to: "/Deshboard",
      iconSrc: "Assets/Images/All Icons/Group 43.svg",
      label: "Dashboard",
    },
    {
      to: "/RateImages",
      iconSrc: "Assets/Images/All Icons/Group 26.svg",
      label: "Rate Images",
    },
    {
      to: "/TagImages",
      iconSrc: "Assets/Images/All Icons/Group 41.svg",
      label: "Tag Images",
    },
    {
      to: "/Submit-Your-Artwork",
      iconSrc: "Assets/Images/All Icons/designtools.svg",
      label: "Submit Your Artwork",
    },
  ];
  const navItemsSupports = [
    {
      to: "/",
      iconSrc: "Assets/Images/All Icons/Group 29.svg",
      label: "Help & Support",
    },
    {
      to: "/",
      iconSrc: "Assets/Images/All Icons/Group 31.svg",
      label: "Community",
    },
  ];
  return (
    <div className="sm-hidden md:hidden lg:block">
      <nav className="sidebar ">
        <div className="border-b logo-sidebar border-[#2C2E2E] h-20 py-6 2xl:py-0 2xl:h-24 flex justify-center items-center">
          <LogoIcon />
        </div>
        <ul className="sidebar-menu lg:py-7 2xl:py-10 2xl:px-6 lg:px-3">
          {navItems.map((item, index) => (
            <li key={index} className="mb-4" >
              <Button className="p-0 w-full rounded-3xl">
                <NavLink className="flex items-center gap-2 py-2 px-4 w-full" to={item.to}>
                  <img src={item.iconSrc} alt={`${item.label} Icon`} />
                  {item.label}
                </NavLink>
              </Button>
            </li>
          ))}
        </ul>
        <div className="nav-bottom border-t border-[#2C2E2E]  mt-auto">
          <ul className="sidebar-menu lg:py-7 2xl:py-10 2xl:px-6 lg:px-3">
            {navItemsSupports.map((item, index) => (
              <li key={index} className="mb-4" >
                <Button className="p-0 w-full rounded-3xl">
                  <NavLink className="flex items-center gap-2 py-2 px-4" to={item.to}>
                    <img src={item.iconSrc} alt={`${item.label} Icon`} />
                    {item.label}
                  </NavLink>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default SideBAr
