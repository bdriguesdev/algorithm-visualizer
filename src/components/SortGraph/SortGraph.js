import React from 'react';

import './SortGraph.scss';

const SortGraph = props => {
    return (
        <div className="sortGraph">
            <div className="element">
                <div className="elementLine"></div>
                <span className="elementValue"></span>
            </div>
            <div className="sortButtons">
                <button className="button btnPink">START</button>
                <button className="button btnYellow">RESET</button>
                <button className="button btnBlue">PAUSE</button>
            </div>
        </div>
    );
};

export default SortGraph;