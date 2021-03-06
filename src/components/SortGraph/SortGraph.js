import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { insertionSortFrames, bubbleSortFrames, selectionSortFrames, heapSortFrames, mergeSortFrames, quickSortFrames } from '../../utils/sort';
import './SortGraph.scss';

const SortGraph = props => {
    const [ array, setArray ] = useState([]);
    const [ minValue, setMinValue ] = useState(null);
    const [ maxValue, setMaxValue ] = useState(null);
    const [ timeline, setTimeline ] = useState(null);

    useSort(props.sort);

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

    function useSort(value) {
        const ref = useRef();
        useLayoutEffect(() => {
            if(ref.current === 'merge' && value !== ref.current) {
                resetAnimation('merge');
            } else if(ref.current && value !== ref.current) {
                resetAnimation('other');
            }
            ref.current = value;
        });
        return ref.current;
    }

    const defineElementHeight = (value, index) => {
        const percentValue = 440 / 50;
        const height = value * percentValue;
        return {
            height: height + 'px',
            backgroundColor: props.color
        };
    };

    const calcLeftValue = index => {
        return {
            left: index === 0? 0 + 'px': (5 * index ) + (0.59 * index) + '%'
        };
    };

    const sortAnimation = () => {
        const sort = {
            insertion: () => insertionSortFrames(array),
            bubble: () => bubbleSortFrames(array),
            selection: () => selectionSortFrames(array),
            heap: () => heapSortFrames(array),
            merge: () => mergeSortFrames(array),
            quick: () => quickSortFrames(array)
        };
        const timeline = sort[props.sort]();
        setTimeline(timeline);
        timeline.play();
    };

    const resetAnimation = sort => {
        if(timeline) timeline.pause();
        setTimeline(null);
        if(sort === 'merge') {
            const elements = document.querySelectorAll('.elementLine');
            elements.forEach((line, index) => {
                const height = defineElementHeight(array[index], index).height;
                const elementValue = document.getElementById('value'+index);
                line.style.height = height;
                elementValue.style.color = 'black';
                elementValue.style.backgroundColor = 'white';
                elementValue.textContent = array[index];
            });
        } else {
            const elements = document.querySelectorAll('.element');
            elements.forEach((element, index) => {
                const elementValue = document.getElementById('value'+index);
                const left = calcLeftValue(index).left;
                elementValue.style.color = 'black';
                elementValue.style.backgroundColor = 'white';
                element.style.left = left;
            });
        }
    }

    const handleStart = () => {
        if(timeline) timeline.play();
        else {
            sortAnimation();
        }
    };

    const handlePause = () => {
        if(timeline) timeline.pause();
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
                <button onClick={handleStart} className="button btnPink" >PLAY</button>
                <button onClick={() => resetAnimation(props.sort)} className="button btnYellow">RESET</button>
                <button onClick={handlePause} className="button btnBlue">PAUSE</button>
            </div>
        </div>
    );
};

export default SortGraph;