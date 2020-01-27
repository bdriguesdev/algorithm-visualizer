import React, { useEffect, useState } from 'react';
import anime from 'animejs';

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

    const insertionSortFrames = arr => {
        let frames = [];
        const arrWithInitialIndex = arr.map((value, index) => {
            return [value, index];
        });
        frames.push({
            type: 'color',
            x: 0,
            duration: 150,
            color: '#FFF',
            backgroundColor: '#FF165D'
        });
        for(let x = 1; x < arr.length; x++) {
            let value = arrWithInitialIndex[x];
            //change color of elementValue
            frames.push({
                type: 'color',
                x,
                duration: 150,
                color: '#FFF',
                backgroundColor: '#FF9A00'
            });
            let y = x - 1;
            while(y >= 0 && arrWithInitialIndex[y][0] > value[0]) {
                arrWithInitialIndex[y + 1] = arrWithInitialIndex[y];
                //change position of x and y
                frames.push({
                    type: 'move',
                    duration: 500,
                    xNewPos: y,
                    xId: value[1],
                    yNewPos: y + 1,
                    yId: arrWithInitialIndex[y][1]
                });
                y--;
            }
            arrWithInitialIndex[y + 1] = value;
            //color to elementValue back to normal
            frames.push({
                type: 'color',
                x,
                duration: 150,
                color: '#FFF',
                backgroundColor: '#FF165D'
            });
        }
        return frames;  
    };

    const insertionSortAnimation = () => {
        const frames = insertionSortFrames(array);
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
                <button onClick={insertionSortAnimation} className="button btnPink" >START</button>
                <button className="button btnYellow">RESET</button>
                <button className="button btnBlue">PAUSE</button>
            </div>
        </div>
    );
};

export default SortGraph;