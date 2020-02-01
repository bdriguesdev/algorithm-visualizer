import React, { useState } from 'react';

import './ColorSelector.scss';

const ColorSelector = props => {
    const [isColorListOpen, setIsColorListOpen] = useState(false);

    const changeColor = color => {
        props.setColor(color)
    };

    const displayColors = () => {
        setIsColorListOpen(oldValue => !oldValue);
    };

    return (
        <div className="colorSelector">
            <div onMouseEnter={displayColors} onMouseLeave={displayColors} style={{ backgroundColor: props.color }} className="colorBox">
                {
                    isColorListOpen && <div className="colorList">
                        {
                            props.colors.map(color => {
                                return (
                                    color !== props.color && <div onClick={() => changeColor(color)} style={{ backgroundColor: color }} key={color} className="color"></div>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <p>bars color</p>
        </div>
    )
};

export default ColorSelector;