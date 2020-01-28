import React, { useEffect, useState } from 'react';
import anime from 'animejs';

import { insertionSortFrames, bubbleSortFrames, selectionSortFrames } from '../../utils/sort'
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

    useEffect(() => {
        resetAnimation();
    }, [props.sort]);

    const defineElementHeight = (value, index) => {
        const percentValue = 440 / 50;
        const height = value * percentValue;
        const graphTotalWidth = document.querySelector('.sortGraph').getBoundingClientRect().width;
        const barWidth = (graphTotalWidth - (array.length - 1) * 3) / array.length;

        return {
            height: height + 'px',
            width: barWidth,
        };
    };

    const calcLeftValue = index => {
        const graphTotalWidth = document.querySelector('.sortGraph').getBoundingClientRect().width;
        const barWidth = (graphTotalWidth - (array.length - 1) * 3) / array.length;

        return {
            left: index === 0? 20 + 'px': 20 + (barWidth * index ) + (3 * index) + 'px'
        };
    }

    const sortAnimation = () => {
        const sort = {
            insertion: () => insertionSortFrames(array),
            bubble: () => bubbleSortFrames(array),
            selection: () => selectionSortFrames(array)
        };
        const frames = sort[props.sort]();
        let delay = 0;
        frames.forEach((frame) => {
            if(frame.type === 'color') {
                setTimeout(() => {
                    anime({
                        targets: '#value' + frame.x,
                        direction: 'normal',
                        duration: frame.duration,
                        easing: 'easeInOutSine',
                        color: frame.color,
                        backgroundColor: frame.backgroundColor? frame.backgroundColor: "" 
                    });
                    if(frame.y) {
                        anime({
                            targets: '#value' + frame.y,
                            direction: 'normal',
                            duration: frame.duration,
                            easing: 'easeInOutSine',
                            color: frame.color,
                            backgroundColor: frame.backgroundColor? frame.backgroundColor: "" 
                        });
                    }
                }, delay);
            } else if(frame.type === 'move') {
                setTimeout(() => {
                    let x = document.getElementById('element'+frame.xId);
                    let y = document.getElementById('element'+frame.yId);
                    const newXLeft = calcLeftValue(frame.xNewPos).left;
                    const newYLeft = calcLeftValue(frame.yNewPos).left;
                    anime({
                        targets: x,
                        direction: 'normal',
                        duration: frame.duration,
                        easing: 'easeInOutSine',
                        left: newXLeft
                    });
                    anime({
                        targets: y,
                        direction: 'normal',
                        duration: frame.duration,
                        easing: 'easeInOutSine',
                        left: newYLeft
                    });
                }, delay + 10);
            }
            delay += frame.duration;
        });
    };

    const resetAnimation = () => {
        const elements = document.querySelectorAll('.element');
        elements.forEach((element, index) => {
            const elementValue = document.getElementById('value'+index);
            const left = calcLeftValue(index).left;
            elementValue.style.color = 'black';
            elementValue.style.backgroundColor = 'white';
            element.style.left = left;
        });
    }

    return (
        <div className="sortGraph">
            <div className="elements">
                {
                    array.length > 0 && (
                        array.map((value, index) => {
                            return (
                                <div style={calcLeftValue(index)} className="element" key={index} id={`element${index}`} >
                                    <div style={defineElementHeight(value, index)} className="elementLine" id={`line${index}`} ></div>
                                    <div className="elementValue" id={`value${index}`}>{value}</div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            <div className="sortButtons">
                <button onClick={sortAnimation} className="button btnPink" >START</button>
                <button onClick={resetAnimation} className="button btnYellow">RESET</button>
                <button className="button btnBlue">PAUSE</button>
            </div>
        </div>
    );
};

export default SortGraph;