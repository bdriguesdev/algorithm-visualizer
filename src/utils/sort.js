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