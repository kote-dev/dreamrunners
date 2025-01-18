import { NavLink } from 'react-router-dom';
import './nav.css';

const Footer = () => {
    const footerItems = [
        { title: 'Explore', link: '/explore', imageSrcInactive: 'Assets/Images/All Icons/Group 190.svg', imageSrcActive: 'Assets/Images/All Icons/Group 191.svg' },
        { title: 'Deshboard', link: '/Deshboard', imageSrcInactive: 'Assets/Images/Navbar/Group 95.png', imageSrcActive: 'Assets/Images/Navbar/Group 116.png' },
        { title: 'Rate Images', link: '/RateImages', imageSrcInactive: 'Assets/Images/Navbar/Group 96.png', imageSrcActive: 'Assets/Images/Navbar/Group 114.png' },
        { title: 'Tag Images', link: '/TagImages', imageSrcInactive: 'Assets/Images/Navbar/Group 110.png', imageSrcActive: 'Assets/Images/Navbar/Group 115.png' },
        // { title: 'My Profile', link: '/MyProfile', imageSrcInactive: 'Assets/Images/Navbar/Ellipse 2.png', imageSrcActive: 'Assets/Images/Navbar/Ellipse 2.png' },
    ];

    return (
        <div className='sm:block lg:hidden'>
            <nav>
                <ul className='grid grid-cols-4 gap-4 justify-center mobile-nav'>
                    {footerItems.map((item, index) => (
                        <li className='text-center' key={index}>
                            <NavLink className="nav-link" to={item.link} activeClassName="active-link">
                                <img src={item.imageSrcInactive} className='non-active-img mx-auto' alt="" />
                                <img src={item.imageSrcActive} alt="" className="active-img mx-auto" />
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Footer;
