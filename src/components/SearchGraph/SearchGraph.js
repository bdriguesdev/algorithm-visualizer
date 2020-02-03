import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

import './SearchGraph.scss';
import { m1, breadthFirstSearchFrames, depthFirstSearchFrames } from '../../utils/search';
import { randomValue } from '../../utils/utils';

const SearchGraph = props => {
    const [gridWidth, setGridWidth] = useState(null);
    const [width, setWidth] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [startPosition, setStartPosition] = useState(null);
    const [finalPosition, setFinalPosition] = useState(null);
    const [grid, setGrid] = useState(m1);

    const timelineRef = useRef(timeline);
    timelineRef.current = timeline;

    useEffect(() => {
        let space = document.querySelector('.searchElements').getBoundingClientRect().width;
        console.log('test', width, gridWidth, (space - (2 * 15)) / 16);
        setGridWidth((space - (2 * 15)) / 16);
    }, [width]);

    useEffect(() => {
        const startPos = [randomValue(0, 8), randomValue(0,15)];
        const finalPos = [];

        window.addEventListener('resize', changeWidth);

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

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, []);

    const changeWidth = () => {
        setWidth(window.innerWidth);
    };

    const changeStartPos = ([ r, c ]) => {
        const startDiv = document.getElementById('startElement');
        const newStartPos = document.getElementById(`r${r}c${c}`);

        newStartPos.appendChild(startDiv);
        setStartPosition([r, c]);
    };

    const changeFinalPos = ([ r, c ]) => {
        const finalDiv = document.getElementById('finalElement');
        const newFinalPos = document.getElementById(`r${r}c${c}`);

        newFinalPos.appendChild(finalDiv);
        setFinalPosition([r, c]);
    };

    const resetAnimation = () => {
        if(timeline) timeline.pause();
        const elements = document.querySelectorAll('.searchElement');
        elements.forEach(element => {
            element.style.backgroundColor = '#3EC1D3';
        });
        setGrid(oldValue => {
            return oldValue.map((row, rowIndex) => {
                return row.map((element, columnIndex) => {
                    return ((row.length - 1) * rowIndex) + rowIndex + columnIndex; 
                });
            })
        });
        changeFinalPos(finalPosition);
        changeStartPos(startPosition);
        setTimeline(null);
    };

    const searchAnimation = () => {
        const search = {
            breadth: () => breadthFirstSearchFrames(grid, startPosition, finalPosition),
            depth: () => depthFirstSearchFrames(grid, startPosition, finalPosition)
        };
        const newTimeline = search[props.search.split(' ')[0]]();
        setTimeline(newTimeline);
        newTimeline.play();
    };

    const createObstacles = (row, column, value) => {
        if(timeline) resetAnimation();
        if(startPosition[0] === row && startPosition[1] === column) return;
        else if(finalPosition[0] === row && finalPosition[1] === column) return;
        setGrid(oldValue => {
            if(oldValue[row][column] === '#') {
                oldValue[row][column] = ((grid[0].length - 1) * row) + row + column; 
                anime({
                    targets: '#'+value,
                    duration: 200,
                    direction: 'normal',
                    easing: 'easeInOutSine',
                    backgroundColor: '#3EC1D3' 
                });
            }
            else {
                oldValue[row][column] = '#';
                anime({
                    targets: '#'+value,
                    duration: 200,
                    direction: 'normal',
                    easing: 'easeInOutSine',
                    backgroundColor: '#000' 
                }); 
            }
            return oldValue;
        });
    };
    
    const pauseAnimation = () => {
        if(timeline) timeline.pause();
    };

    const startAnimation = () => {
        if(timeline) timeline.play();
        else searchAnimation();
    };

    const restartAnimation = () => {
        if(timeline) timeline.restart();
    };

    const dragStart = evt => {
        evt.dataTransfer.setData("id", evt.target.getAttribute('id'));
        evt.dataTransfer.setData("element", evt.target.getAttribute('id').split('E')[0]);
    };

    const dragEnter = evt => {
        evt.preventDefault();
    };

    const dragOver = evt => {
        evt.preventDefault();
    };

    const dragDrop = (evt, row, column) => {
        evt.stopPropagation();
        const pos = evt.dataTransfer.getData("element");
        const data = evt.dataTransfer.getData("id");
        if(pos === 'start') {
            if(timeline) resetAnimation();
            setTimeline(null);
            setStartPosition([row, column]);
        } else if(pos === 'final') {
            if(timeline) resetAnimation();
            setTimeline(null);
            setFinalPosition([row, column]);
        }
        if(grid[row][column] === '#') return;
        evt.target.appendChild(document.getElementById(data));
    };

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
                    grid.map((row, index) => {
                        return(
                            <div className="elementsRow" key={index} id={`row${index}`} >
                                {
                                    row.map((element, column) => {
                                        return (
                                            <div 
                                                key={`${element}${column}`}
                                                style={element === '#'? { width: gridWidth + 'px', height: gridWidth + 'px', backgroundColor: '#000' }: { width: gridWidth + 'px', height: gridWidth + 'px' }} 
                                                className="searchElement" id={`r${index}c${column}`}
                                                onDragEnter={dragEnter}
                                                onDragOver={dragOver}
                                                onDrop={evt => dragDrop(evt, index, column)}
                                                onClick={() => createObstacles(index, column, `r${index}c${column}`)}
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
                <button onClick={startAnimation} className="button btnPink" >PLAY</button>
                <button onClick={restartAnimation} className="button btnYellow">RESTART</button>
                <button onClick={pauseAnimation} className="button btnBlue">PAUSE</button>
                <button onClick={resetAnimation} className="button btnPink">RESET</button>
            </div>
        </div>
    )
};

export default SearchGraph;