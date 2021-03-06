import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import anime from 'animejs'

import './Header.scss';

const Header = () => {
    const [ isSortMenuOpen, setIsSortMenuOpen ] = useState(false);
    const [ isSearchMenuOpen, setIsSearchMenuOpen ] = useState(false);

    useEffect(() => {
        const lines = document.querySelectorAll('.logo svg line');
        const tl = anime.timeline({ easing: 'easeInOutSine', direction: 'normal', delay: 200 });
        tl
        .add({
            targets: lines[0],
            translateX: [
                {
                    value: [0, 8],
                    duration: 500
                },
                {
                    value: [8, 16],
                    duration: 500
                }
            ]
        })
        .add({
            targets: lines[1],
            translateX: [
                {
                    value: [0, -8],
                    duration: 500
                }
            ]
        }, 0)
        .add({
            targets: lines[2],
            translateX: [
                {
                    value: [0, -8],
                    duration: 500
                }
            ]
        }, 500)
    }, []);

    const openOrCloseMenu = menu => {
        if(menu === 'sort') setIsSortMenuOpen(oldValue => !oldValue);
        else if(menu === 'search') setIsSearchMenuOpen(oldValue => !oldValue);
    }; 

    const menuHover = (color, sort, direction) => {
        const tl = anime.timeline({ easing: 'easeOutExpo', direction });
        tl
        .add({
            targets: `#${sort} a`,
            color: ['#000', color],
            duration: 200,
            translateX: [0, 20]
        })
        .add({
            targets: '#' + sort + 'SVG',
            duration: 200,
            translateX: [-10, 18],
            opacity: [0, 1]
        }, 0)
    };

    return (
        <header className="header">
            <div className="logo">
                <svg className="logoImg" width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.5" y1="6.55671e-08" x2="1.5" y2="20" stroke="#3EC1D3" strokeWidth="3"/>
                    <line x1="9.5" y1="7" x2="9.5" y2="20" stroke="#FF165D" strokeWidth="3"/>
                    <line x1="17.5" y1="4" x2="17.5" y2="20" stroke="#FF9A00" strokeWidth="3"/>
                </svg>
                <h1 className="logoText">Algorithm visualizer</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li onMouseEnter={() => openOrCloseMenu('sort')} onMouseLeave={() => openOrCloseMenu('sort')} className="link">
                        sort
                        <div style={{ display: isSortMenuOpen? 'block': 'none' }} className="sortMenu">
                            <ul>
                                <li onMouseEnter={() => menuHover('#FF165D', 'insertion', 'normal')} onMouseLeave={() => menuHover('#FF165D', 'insertion', 'reverse')} id="insertion" className="menuLink">
                                    <svg id="insertionSVG" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#FF165D"/>
                                    </svg>
                                    <Link to="/sort/insertion">insertion sort</Link>
                                </li>
                                <li onMouseEnter={() => menuHover('#FF9A00', 'bubble', 'normal')} onMouseLeave={() => menuHover('#FF9A00', 'bubble', 'reverse')} id="bubble" className="menuLink">
                                    <svg id="bubbleSVG"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#FF9A00"/>
                                    </svg>
                                    <Link to="/sort/bubble">bubble sort</Link>
                                </li>
                                <li onMouseEnter={() => menuHover('#3EC1D3', 'selection', 'normal')} onMouseLeave={() => menuHover('#3EC1D3', 'selection', 'reverse')} id="selection" className="menuLink">
                                    <svg id="selectionSVG"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#3EC1D3"/>
                                    </svg>
                                    <Link to="/sort/selection">selection sort</Link>
                                </li>
                                <li onMouseEnter={() => menuHover('#FF165D', 'heap', 'normal')} onMouseLeave={() => menuHover('#FF165D', 'heap', 'reverse')} id="heap" className="menuLink">
                                    <svg id="heapSVG"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#FF165D"/>
                                    </svg>
                                    <Link to="/sort/heap">heap sort</Link>
                                </li>
                                <li onMouseEnter={() => menuHover('#FF9A00', 'merge', 'normal')} onMouseLeave={() => menuHover('#FF9A00', 'merge', 'reverse')} id="merge" className="menuLink">
                                    <svg id="mergeSVG"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#FF9A00"/>
                                    </svg>
                                    <Link to="/sort/merge">merge sort</Link>
                                </li>
                                <li onMouseEnter={() => menuHover('#3EC1D3', 'quick', 'normal')} onMouseLeave={() => menuHover('#3EC1D3', 'quick', 'reverse')} id="quick" className="menuLink">
                                    <svg id="quickSVG"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#3EC1D3"/>
                                    </svg>
                                    <Link to="/sort/quick">quick sort</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li onMouseEnter={() => openOrCloseMenu('search')} onMouseLeave={() => openOrCloseMenu('search')} className="link">
                        search
                        <div style={{ display: isSearchMenuOpen? 'block': 'none' }} className="searchMenu">
                            <ul>
                                <li onMouseEnter={() => menuHover('#FF165D', 'breadth', 'normal')} onMouseLeave={() => menuHover('#FF165D', 'breadth', 'reverse')} id="breadth" className="menuLink">
                                    <svg id="breadthSVG" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#FF165D"/>
                                    </svg>
                                    <Link to="/search/breadth">breadth first search</Link>
                                </li>
                                <li onMouseEnter={() => menuHover('#FF9A00', 'depth', 'normal')} onMouseLeave={() => menuHover('#FF9A00', 'depth', 'reverse')} id="depth" className="menuLink">
                                    <svg id="depthSVG" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z" fill="#FF9A00"/>
                                    </svg>
                                    <Link to="/search/depth">depth first search</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;