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
        const startDiv = document.getElementById('startElement');
        const newStartPos = document.getElementById(`element${m[r][c]}`);
        // if(startPosition && startPosition[0] !== r && startPosition[1] !== c) {
        //     const [ oldR, oldC ] = startPosition;
        //     const oldStartPos = document.getElementById(`element${m[oldR][oldC]}`);
        //     oldStartPos.removeChild(startDiv);
        // }
        newStartPos.appendChild(startDiv);
        setStartPosition([r, c]);
    };

    const changeFinalPos = ([ r, c ]) => {
        const finalDiv = document.getElementById('finalElement');
        const newFinalPos = document.getElementById(`element${m[r][c]}`);
        if(finalPosition && finalPosition[0] !== r && finalPosition[1] !== c) {
            const [ oldR, oldC ] = finalPosition;
            const oldFinalPos = document.getElementById(`element${m[oldR][oldC]}`);
            oldFinalPos.removeChild(finalDiv);
        }
        newFinalPos.appendChild(finalDiv);
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

    const dragStart = evt => {
        evt.dataTransfer.setData("id", evt.target.getAttribute('id'));
        evt.dataTransfer.setData("element", evt.target.getAttribute('id').split('E')[0]);
    }

    const dragEnter = evt => {
        evt.preventDefault();
    }

    const dragOver = evt => {
        evt.preventDefault();
    }

    const dragDrop = (evt, row, column) => {
        const pos = evt.dataTransfer.getData("element");
        const data = evt.dataTransfer.getData("id");
        if(pos === 'start') {
            setStartPosition([row, column]);
        } else if(pos === 'final') {
            setFinalPosition([row, column]);
        }
        evt.target.appendChild(document.getElementById(data));
        evt.stopPropagation();
    }

    return (
        <div className="searchGraph">
            <div className="searchElements">
                <div 
                    draggable='true' 
                    id="startElement"
                    onDragStart={dragStart}
                >
                    S
                </div>
                <div 
                    draggable='true' 
                    id="finalElement"
                    onDragStart={dragStart}
                >
                    E
                </div>
                {
                    m.map((row, index) => {
                        return(
                            <div className="elementsRow" key={index} id={`row${index}`} >
                                {
                                    row.map((element, column) => {
                                        return (
                                            <div 
                                                key={element} 
                                                style={{ width: gridWidth + 'px', height: gridWidth + 'px' }} 
                                                className="searchElement" id={`element${element}`} 
                                                onDragEnter={dragEnter}
                                                onDragOver={dragOver}
                                                onDrop={evt => dragDrop(evt, index, column)}
                                            >
                                            </div>
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