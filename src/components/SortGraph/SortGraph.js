import React from 'react';

import './SortGraph.scss';

const SortGraph = props => {
    return (
        <div className="sortGraph">
            <div className="element">
                <div className="elementLine"></div>
                <span className="elementValue"></span>
            </div>
        </div>
    );
};

export default SortGraph;