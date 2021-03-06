import React, { useState } from 'react';

import './Sort.scss';
import SortGraph from '../SortGraph/SortGraph';
import ColorSelector from '../ColorSelector/ColorSelector';

const Sort = props => {
    const [ array, setArray ] = useState(null);
    const [ color, setColor ] = useState('#3EC1D3')

    return (
        <section className="sort">
            <div className="info">
                <h2>{ props.sortName } sort</h2>
                <form className="sortForm">
                    <div className="inputContainer">
                        <ColorSelector color={color} setColor={setColor} colors={['#3EC1D3', '#FF9A00', '#FF165D', '#FF16CC', '#B416FF', '#46F829', '#FFF500']} />
                    </div>
                </form>
                <div className="sortCases">
                    <div className="sortCase">
                        <h3 style={{ color: '#FF165D' }} >BEST</h3>
                        <span>Ω({props.best})</span>
                    </div>
                    <div className="sortCase">
                        <h3 style={{ color: '#FF9A00' }} >AVERAGE</h3>
                        <span>Θ({props.average})</span>
                    </div>
                    <div className="sortCase">
                        <h3 style={{ color: '#3EC1D3' }} >WORST</h3>
                        <span>O({props.worst})</span>
                    </div>
                </div>
            </div>
            <SortGraph sort={props.sortName} array={array} setArray={setArray} color={color} />
        </section>
    );
};

export default Sort;