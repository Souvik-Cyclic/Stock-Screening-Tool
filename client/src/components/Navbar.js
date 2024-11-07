import React, { useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.svg';
import userLogo from '../assets/images/user.svg'; 
import downArrow from '../assets/images/down-arrow.svg';
import SearchBar from './SearchBar';

function Navbar() {
    const [isToolDropdownOpen, setIsToolDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleToolDropdown = () => {
        setIsToolDropdownOpen((prevState) => {
            if (!prevState) {
                setIsUserDropdownOpen(false);
            }
            return !prevState;
        });
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen((prevState) => {
            if (!prevState) {
                setIsToolDropdownOpen(false);
            }
            return !prevState;
        });
    };

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <a href='/' className='navbar-logo'>
                    <img src={logo} alt='logo' />
                </a>
                <ul className='nav-links'>
                    <li className='nav-item'>
                        <a href='/' className='nav-link'>
                            FEED
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/' className='nav-link'>
                            SCREENS
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a
                            href='/'
                            className='nav-link'
                            onClick={(e) => {
                                e.preventDefault();
                                toggleToolDropdown();
                            }}
                        >
                            TOOLS
                            <img src={downArrow} alt='Dropdown arrow' className='dropdown-arrow'/>
                        </a>
                        {isToolDropdownOpen && (
                            <ul className='dropdown-menu-tool'>
                                <li><a href='/' className='dropdown-link'>Create a stock screen</a></li>
                                <li><a href='/' className='dropdown-link'>Commodity Prices</a></li>
                                <li><a href='/' className='dropdown-link'>Search shareholders</a></li>
                                <li><a href='/' className='dropdown-link'>Latest Announcements</a></li>
                                <li><button className='dropdown-button'>Upgrade to Premium</button></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
            <div className='navbar-search'>
                <SearchBar />
            </div>
            <div className='navbar-user'>
                <button className='navbar-user-btn'>
                <a
                    href='/'
                    className='nav-link'
                    onClick={(e) => {
                        e.preventDefault();
                        toggleUserDropdown();
                    }}
                >
                    <img src={userLogo} alt='user' className='user-logo'/>
                    SOUVIK
                    <img src={downArrow} alt='Dropdown arrow' className='dropdown-arrow'/>
                </a>
                </button>
                {isUserDropdownOpen && (
                    <ul className='dropdown-menu-user'>
                        <li><a href='/' className='dropdown-link'>Profile</a></li>
                        <li><a href='/' className='dropdown-link'>Alerts</a></li>
                        <li><a href='/' className='dropdown-link'>Notebook</a></li>
                        <li><a href='/' className='dropdown-link'>Upgrade</a></li>
                        <li><a href='/' className='dropdown-link'>Logout</a></li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;