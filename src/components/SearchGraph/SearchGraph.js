import React, { useEffect, useState } from 'react';
import anime from 'animejs';

import './SearchGraph.scss';
import { m, breadthFirstSearchFrames } from '../../utils/search';

const SearchGraph = props => {
    const [gridWidth, setGridWidth] = useState(null);
    const [animationInProgress, setAnimationInProgress] = useState(false);

    useEffect(() => {
        const space = document.querySelector('.searchElements').getBoundingClientRect().width - 40;
        setGridWidth((space - (2 * 15)) / 16);
    }, []);

    const searchAnimation = () => {
        const search = {
            breadth: () => breadthFirstSearchFrames(55, 3, 7),
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
                <button className="button btnYellow">RESET</button>
                <button className="button btnBlue">PAUSE</button>
            </div>
        </div>
    )
};

export default SearchGraph;