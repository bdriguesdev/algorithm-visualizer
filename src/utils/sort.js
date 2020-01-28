export const insertionSortFrames = arr => {
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
                duration: 250,
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

export const bubbleSortFrames = arr => {
    let frames = [];
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    for(let x = 1; x < arr.length; x++) {
        let swap = false;
        let stopIndex = 0;
        for(let y = 0; y < arr.length - x; y++) {
            frames.push({
                type: 'color',
                x: arrWithInitialIndex[y][1],
                y: arrWithInitialIndex[y + 1][1],
                duration: 150,
                color: '#FFF',
                backgroundColor: '#FF9A00'
            });
            if(arrWithInitialIndex[y][0] > arrWithInitialIndex[y + 1][0]) {
                swap = true;
                const yValue = arrWithInitialIndex[y];
                frames.push({
                    type: 'move',
                    duration: 150,
                    xNewPos: y + 1,
                    xId: arrWithInitialIndex[y][1],
                    yNewPos: y,
                    yId: arrWithInitialIndex[y + 1][1]
                });
                arrWithInitialIndex[y] = arrWithInitialIndex[y + 1];
                arrWithInitialIndex[y + 1] = yValue;
                
            }
            frames.push({
                type: 'color',
                x: arrWithInitialIndex[y][1],
                duration: 150,
                color: '#000',
                backgroundColor: '#FFF'
            });
            stopIndex = y + 1;
        }
        frames.push({
            type: 'color',
            x: arrWithInitialIndex[stopIndex][1],
            duration: 150,
            color: '#FFF',
            backgroundColor: '#FF165D'
        });
        if(!swap) {
            for(let z = stopIndex - 1; z > 0; z--) {
                frames.push({
                    type: 'color',
                    x: arrWithInitialIndex[z][1],
                    duration: 150,
                    color: '#FFF',
                    backgroundColor: '#FF165D'
                });
            }
            break;
        }
    }
    frames.push({
        type: 'color',
        x: arrWithInitialIndex[0][1],
        duration: 150,
        color: '#FFF',
        backgroundColor: '#FF165D'
    });
    return frames;
};

export const selectionSortFrames = arr => {
    let frames = [];
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    for(let x = 0; x < arr.length; x++) {
        let minIndex = x;
        frames.push({
            type: 'color',
            x: arrWithInitialIndex[minIndex][1],
            duration: 150,
            color: '#FFF',
            backgroundColor: '#3EC1D3'
        });
        for(let y = x; y < arr.length; y++) {
            frames.push({
                type: 'color',
                x: arrWithInitialIndex[y][1],
                duration: 100,
                color: '#FFF',
                backgroundColor: '#FF9A00'
            });
            if(arrWithInitialIndex[y][0] < arrWithInitialIndex[minIndex][0]) {
                frames.push({
                    type: 'color',
                    x: arrWithInitialIndex[minIndex][1],
                    duration: 50,
                    color: '#000',
                    backgroundColor: '#FFF'
                });
                minIndex = y;
                frames.push({
                    type: 'color',
                    x: arrWithInitialIndex[y][1],
                    duration: 50,
                    color: '#FFF',
                    backgroundColor: '#3EC1D3'
                });
            } else if(y !== minIndex) {
                frames.push({
                    type: 'color',
                    x: arrWithInitialIndex[y][1],
                    duration: 100,
                    color: '#000',
                    backgroundColor: '#FFF'
                });
            }
        }
        frames.push({
            type: 'move',
            duration: 150,
            xNewPos: minIndex,
            xId: arrWithInitialIndex[x][1],
            yNewPos: x,
            yId: arrWithInitialIndex[minIndex][1]
        });
        frames.push({
            type: 'color',
            x: arrWithInitialIndex[minIndex][1],
            duration: 50,
            color: '#FFF',
            backgroundColor: '#FF165D'
        });
        const xValue = arrWithInitialIndex[x];
        arrWithInitialIndex[x] = arrWithInitialIndex[minIndex];
        arrWithInitialIndex[minIndex] = xValue;
    }
    return frames;
};