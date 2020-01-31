import React, { useEffect } from 'react';

import './Search.scss';
import SearchGraph from '../SearchGraph/SearchGraph';

const Search = props => {
    useEffect(() => {
        setTimeout(() => {
            const searchInfo = document.querySelector('.search .info');
            const searchGraphElement = document.querySelector('.searchElement').getBoundingClientRect().width;
            searchInfo.style.height = searchGraphElement * 9 + 40 + 2 * 8 + 'px';
        }, 1);
    });

    return (
        <section className="search">
            <div className="info">
                <h2>{ props.searchName } search</h2>
                <form className="searchForm">
                    <div className="inputContainer">
                        <input type="text" id="color"/><label htmlFor="color">grid color</label><br />
                    </div>
                </form>
                <div className="searchCases">
                    <div className="searchCase">
                        <h3 style={{ color: '#FF165D' }} >TIME COMPLEXITY</h3>
                        <span>O({props.time})</span>
                    </div>
                </div>
            </div>
            <SearchGraph search={props.searchName} />
        </section>
    )
};

export default Search;