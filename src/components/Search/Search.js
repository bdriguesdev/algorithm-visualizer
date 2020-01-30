import React from 'react';

import './Search.scss';
import SearchGraph from '../SearchGraph/SearchGraph';

const Search = props => {
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
            <SearchGraph />
        </section>
    )
};

export default Search;