import React, { useState } from 'react';

import './Header.scss';

const Header = () => {
    const [ isSortMenuOpen, setIsSortMenuOpen ] = useState(false);

    const openOrCloseMenu = () => {
        setIsSortMenuOpen(oldValue => !oldValue);
    } 

    return (
        <header className="header">
            <div className="logo">
                <svg className="logoImg" width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.5" y1="6.55671e-08" x2="1.5" y2="20" stroke="#FF165D" strokeWidth="3"/>
                    <line x1="9.5" y1="7" x2="9.5" y2="20" stroke="#FF9A00" strokeWidth="3"/>
                    <line x1="17.5" y1="4" x2="17.5" y2="20" stroke="#3EC1D3" strokeWidth="3"/>
                </svg>
                <h1 className="logoText">Algorithm visualizer</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li onMouseEnter={openOrCloseMenu} onMouseLeave={openOrCloseMenu} className="link">
                        sort
                        <div style={{ display: isSortMenuOpen? 'block': 'none' }} className="sortMenu">
                            <ul>
                                <li className="sortLink">insertion sort</li>
                                <li className="sortLink">bubble sort</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;