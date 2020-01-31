import React, { useEffect, useState } from 'react';

import './SearchGraph.scss';
import { m } from '../../utils/search'

const SearchGraph = () => {
    const [gridWidth, setGridWidth] = useState(null);

    useEffect(() => {
        console.log(m);
        const space = document.querySelector('.searchElements').getBoundingClientRect().width - 40;
        setGridWidth((space - (2 * 15)) / 16);
    }, []);

    return (
        <div className="searchGraph">
            <div className="searchElements">
                {
                    m.map((row, index) => {
                        return(
                            <div className="elementsRow" key={index} id={`row${index}`} >
                                {
                                    row.map((element, index) => {
                                        return (
                                            <div key={element} style={{ width: gridWidth + 'px', height: gridWidth + 'px' }} className="searchElement" id={`element${index}`} ></div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="searchButtons">
                <button className="button btnPink" >START</button>
                <button className="button btnYellow">RESET</button>
                <button className="button btnBlue">PAUSE</button>
            </div>
        </div>
    )
};

export default SearchGraph;