import React, { useEffect, useState } from 'react';
import anime from 'animejs';

import './SearchGraph.scss';
import { m, breadthFirstSearchFrames } from '../../utils/search';
import { randomValue } from '../../utils/utils';

const SearchGraph = props => {
    const [gridWidth, setGridWidth] = useState(null);
    const [animationInProgress, setAnimationInProgress] = useState(false);
    const [startPosition, setStartPosition] = useState(null);
    const [finalPosition, setFinalPosition] = useState(null);

    useEffect(() => {
        const startPos = [randomValue(0, 8), randomValue(0,15)];
        const finalPos = [];
        const space = document.querySelector('.searchElements').getBoundingClientRect().width - 40;

        setGridWidth((space - (2 * 15)) / 16);
        let antiInfinite = 0;
        while(finalPos.length === 0) {
            antiInfinite++;
            if(antiInfinite>250) break;
            const r = randomValue(0, 8);
            const c = randomValue(0, 15);
            if(r === startPos[0] && c === startPos[1]) continue;
            finalPos.push(r);
            finalPos.push(c);
        }
        changeStartPos(startPos);
        changeFinalPos(finalPos)
    }, []);

    const changeStartPos = ([ r, c ]) => {
        const newStartPos = document.getElementById(`element${m[r][c]}`);
        if(startPosition && startPosition[0] !== r && startPosition[1] !== c) {
            const [ oldR, oldC ] = startPosition;
            const oldStartPos = document.getElementById(`element${m[oldR][oldC]}`);
            oldStartPos.style.backgroundColor = '#3EC1D3';
            oldStartPos.textContent = '';
        }
        newStartPos.style.backgroundColor = '#FF165D';
        newStartPos.textContent = 'S';
        setStartPosition([r, c]);
    };

    const changeFinalPos = ([ r, c ]) => {
        const newFinalPos = document.getElementById(`element${m[r][c]}`);
        if(finalPosition && finalPosition[0] !== r && finalPosition[1] !== c) {
            const [ oldR, oldC ] = finalPosition;
            const oldFinalPos = document.getElementById(`element${m[oldR][oldC]}`);
            oldFinalPos.style.backgroundColor = '#3EC1D3';
            oldFinalPos.textContent = '';
        }
        newFinalPos.style.backgroundColor = '#FF165D';
        newFinalPos.textContent = 'E';
        setFinalPosition([r, c]);
    };

    const resetAnimation = () => {
        const elements = document.querySelectorAll('.searchElement');
        elements.forEach(element => {
            element.style.backgroundColor = '#3EC1D3';
        });
        changeFinalPos(finalPosition);
        changeStartPos(startPosition);
    };

    const searchAnimation = () => {
        const search = {
            breadth: () => breadthFirstSearchFrames(startPosition, finalPosition),
        };
        const frames = search[props.search.split(' ')[0]]();
        let delay = 0;
        frames.forEach((frame, index) => {
            if(frame.type === 'bg') {
                setTimeout(() => {
                    anime({
                        targets: '#element' + frame.x,
                        direction: 'normal',
                        duration: frame.duration,
                        easing: 'easeInOutSine',
                        backgroundColor: frame.backgroundColor 
                    });
                }, delay);
            }
            delay += frame.duration;
            if(index === frames.length - 1) {
                setTimeout(() => {
                    setAnimationInProgress(false);
                }, delay);
            }
        });
    };

    return (
        <div className="searchGraph">
            <div className="searchElements">
                {
                    m.map((row, index) => {
                        return(
                            <div className="elementsRow" key={index} id={`row${index}`} >
                                {
                                    row.map(element => {
                                        return (
                                            <div key={element} style={{ width: gridWidth + 'px', height: gridWidth + 'px' }} className="searchElement" id={`element${element}`} ></div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="searchButtons">
                <button onClick={searchAnimation} className="button btnPink" >START</button>
                <button onClick={resetAnimation} className="button btnYellow">RESET</button>
                <button className="button btnBlue">PAUSE</button>
            </div>
        </div>
    )
};

export default SearchGraph;