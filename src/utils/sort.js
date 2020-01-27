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

export const bubbleSortFrames = arr => {
    let frames = [];
    for(let x = 1; x < arr.length; x++) {
        let swap = false;
        for(let y = 0; y < arr.length - 1; y++) {
            if(arr[y] > arr[y + 1]) {
                swap = true;
                const yValue = arr[y];
                arr[y] = arr[y + 1];
                arr[y + 1] = yValue;
            }
        }
        if(!swap) break;
    }
    return frames;
}