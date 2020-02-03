import React, { useEffect, useState } from 'react';

import './Search.scss';
import SearchGraph from '../SearchGraph/SearchGraph';
import ColorSelector from '../ColorSelector/ColorSelector';

const Search = props => {
    const [ width, setWidth ] = useState(null);
    const [ color, setColor ] = useState('#3EC1D3')

    useEffect(() => {
        window.addEventListener('resize', changeWidth);
        setTimeout(() => {
            const searchInfo = document.querySelector('.search .info');
            if(window.innerWidth > 1140) {
                const searchGraphElement = document.querySelector('.searchElement').getBoundingClientRect().width;
                searchInfo.style.height = searchGraphElement * 9 + 40 + 2 * 8 + 'px';
            } else {
                searchInfo.style.height = 'auto';
            }
        }, 1);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [width]);

    const changeWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    }

    return (
        <section className="search">
            <div className="info">
                <h2>{ props.searchName } search</h2>
                <form className="searchForm">
                    <div className="inputContainer">
                        <ColorSelector color={color} setColor={setColor} colors={['#3EC1D3', '#FF16CC', '#B416FF', '#46F829', '#FFF500']} />
                    </div>
                    <div className="searchCaseLowRes">
                        <h3 style={{ color: '#FF165D' }} >TIME COMPLEXITY</h3>
                        <span>O({props.time})</span>
                    </div>
                </form>
                <div className="searchCases">
                    <div className="searchCase">
                        <h3 style={{ color: '#FF165D' }} >TIME COMPLEXITY</h3>
                        <span>O({props.time})</span>
                    </div>
                </div>
            </div>
            <SearchGraph search={props.searchName} color={color} />
        </section>
    )
};

export default Search;