import React, { useEffect, useState } from 'react';

import './SortGraph.scss';

const SortGraph = props => {
    const [ array, setArray ] = useState([]);
    const [ minValue, setMinValue ] = useState(null);
    const [ maxValue, setMaxValue ] = useState(null);
    
    useEffect(() => {
        if(!props.array) {
            //creating a random array with 18 elements, each element with a value between 1-50
            for(let x = 0; x < 18; x++) {
                const value = Math.floor(Math.random() * (50 - 1 + 1) + 1);
                setArray(oldArr => {
                    oldArr.push(value);
                    return oldArr;
                });
            }
            //finding min and max
            let min = array[0];
            let max = array[0];
            array.forEach(value => {
                if(value < min) min = value;
                if(value > max) max = value;
            });
            setMinValue(min);
            setMaxValue(max);
        }
    }, [props.array, array]);

    

    const defineElementHeight = (value, index) => {
        const percentValue = 440 / 50;
        const height = value * percentValue;
        const graphTotalWidth = document.querySelector('.sortGraph').getBoundingClientRect().width;
        const barWidth = (graphTotalWidth - (array.length - 1) * 3) / array.length;

        console.log(value, height, (graphTotalWidth - array.length * 3 ) / array.length);
        return {
            height: height + 'px',
            width: barWidth,
        };
    };

    const calcLeftValue = index => {
        const graphTotalWidth = document.querySelector('.sortGraph').getBoundingClientRect().width;
        const barWidth = (graphTotalWidth - (array.length - 1) * 3) / array.length;

        console.log(barWidth);
        return {
            left: index === 0? 20 + 'px': 20 + (barWidth * index ) + (3 * index) + 'px'
        };
    }

    return (
        <div className="sortGraph">
            <div className="elements">
                {
                    array.length > 0 && (
                        array.map((value, index) => {
                            return (
                                <div style={calcLeftValue(index)} className="element" key={index} >
                                    <div style={defineElementHeight(value, index)} className="elementLine"></div>
                                    <span className="elementValue">{value}</span>
                                </div>
                            )
                        })
                    )
                }
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