import anime from 'animejs';

const sortTimeline = anime.timeline();
let lineFrames = [];
let valueFrames = [];
let boxFrames = [];

const createEmptyFrames = length => {
    lineFrames = [];
    valueFrames = [];
    boxFrames = [];
    for(let x = 0; x < length; x++) {
        lineFrames.push(null);
        valueFrames.push(null);
        boxFrames.push(null);
    }
};

const addFramesToTimeline = (lineFrames, valueFrames, boxFrames) => {
    lineFrames.forEach(frame => {
        if(frame) sortTimeline.add(frame, 0);
    });
    valueFrames.forEach(frame => {
        if(frame) sortTimeline.add(frame, 0);
    });
    boxFrames.forEach(frame => {
        if(frame) sortTimeline.add(frame, 0);
    });
};

const calcNewPosition = (index, length) => {
    const graphTotalWidth = document.querySelector('.sortGraph').getBoundingClientRect().width;
    const barWidth = (graphTotalWidth - (length - 1) * 3) / length;
    return {
        left: index === 0? 20 + 'px': 20 + (barWidth * index ) + (3 * index) + 'px'
    };
};

const moveFrame = (frames, frame, id) => {
    const leftPos = calcNewPosition(frame.newIndex, 18).left;
    if(frames[id]) {
        let prevDelay = 0
        frames[id].left.forEach(({ delay, duration }) =>  {
            prevDelay += delay + duration;
        });
        frames[id].left.push({
            value: leftPos,
            duration: frame.duration,
            delay: frame.delay - prevDelay
        });
    } else {
        frames[id] = {};
        frames[id].left = [{
            value: leftPos,
            duration: frame.duration,
            delay: frame.delay
        }];
    }
    return frames;
};

const bgFrame = (frames, frame, id) => {
    if(frames[id] && frames[id].backgroundColor) {
        let prevDelay = 0
        frames[id].backgroundColor.forEach(({ delay, duration }) =>  {
            prevDelay += delay + duration;
        });
        frames[id].backgroundColor.push({
            value: frame.backgroundColor,
            duration: frame.duration,
            delay: frame.delay - prevDelay
        });
    } else {
        if(!frames[id]) frames[id] = {};
        frames[id].backgroundColor = [{
                value: frame.backgroundColor,
                duration: frame.duration,
                delay: frame.delay
        }];
    }
    return frames;
};

const newcolorFrame = (frames, frame, id) => {
    if(frames[id] && frames[id].color) {
        let prevDelay = 0
        frames[id].color.forEach(({ delay, duration }) =>  {
            prevDelay += delay + duration;
        });
        frames[id].color.push({
            value: frame.color,
            duration: frame.duration,
            delay: frame.delay - prevDelay
        });
    } else {
        if(!frames[id]) frames[id] = {};
        frames[id].color = [{
            value: '#000',
            duration: 1,
            delay: 0
        }];
        frames[id].color.push({
            value: frame.color,
            duration: frame.duration,
            delay: frame.delay
        });
    }
    return frames;
};

const createFrame = (frames, frame) => {
    let target = null;
    const { id } = frame;

    if(frame.type === 'move') {
        if(!frames[id]) target = document.getElementById('element'+id);
        frames = moveFrame(frames, frame, id);
    } else if(frame.type === 'bg') {
        if(!frames[id]) target = document.getElementById('value'+id);
        frames = bgFrame(frames, frame, id);
    } else if(frame.type === 'color') {
        if(!frames[id]) target = document.getElementById('value'+id);
        frames = newcolorFrame(frames, frame, id);
    }
    
    if(target) {
        frames[id].targets = target;
        frames[id].easing = 'easeInOutSine';
        frames[id].direction = 'normal';
    }
    return frames;
};

export const insertionSortFramesTest = arr => {
    //preparing frames array
    createEmptyFrames(arr.length);
    let delay = 0;
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });

    valueFrames = createFrame(valueFrames, { type: 'color',  id: 0, duration: 150, color: '#FFF', delay });
    valueFrames = createFrame(valueFrames, {  type: 'bg', id: 0, duration: 150, backgroundColor: '#FF165D', delay });
    delay += 150;

    for(let x = 1; x < arr.length; x++) {
        let value = arrWithInitialIndex[x];
        //change color of elementValue
        valueFrames = createFrame(valueFrames, {  type: 'color', id: x, duration: 150, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, {  type: 'bg', id: x, duration: 150, backgroundColor: '#FF9A00', delay });
        delay += 150;
        let y = x - 1;

        while(y >= 0 && arrWithInitialIndex[y][0] > value[0]) {
            arrWithInitialIndex[y + 1] = arrWithInitialIndex[y];
            //change position of x and y
            boxFrames = createFrame(boxFrames, {  type: 'move', id: value[1], duration: 250, newIndex: y, delay });
            boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[y][1], duration: 250, newIndex: y + 1, delay });
            delay += 250;
            y--;
        }

        arrWithInitialIndex[y + 1] = value;
        //color to elementValue back to normal
        valueFrames = createFrame(valueFrames, {  type: 'color', id: x, duration: 150, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, {  type: 'bg', id: x, duration: 150, backgroundColor: '#FF165D', delay });
        delay += 150;
    }

    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    return sortTimeline; 
};

export const bubbleSortFramesTest = arr => {
    //preparing frames array
    createEmptyFrames(arr.length);
    let delay = 0;
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    for(let x = 1; x < arr.length; x++) {
        let swap = false;
        let stopIndex = 0;

        for(let y = 0; y < arr.length - x; y++) {
            // change color of the two elements of the next conditional(if)
            valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 150, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, {  type: 'bg', id: arrWithInitialIndex[y][1], duration: 150, backgroundColor: '#FF9A00', delay });
            valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y + 1][1], duration: 150, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, {  type: 'bg', id: arrWithInitialIndex[y + 1][1], duration: 150, backgroundColor: '#FF9A00', delay });
            delay += 150;

            if(arrWithInitialIndex[y][0] > arrWithInitialIndex[y + 1][0]) {
                swap = true;
                const yValue = arrWithInitialIndex[y];
                // if the first element is bigger then the second one, both will change the position
                boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[y][1], duration: 150, newIndex: y + 1, delay });
                boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[y + 1][1], duration: 150, newIndex: y, delay });
                delay += 150;

                arrWithInitialIndex[y] = arrWithInitialIndex[y + 1];
                arrWithInitialIndex[y + 1] = yValue;
            }

            // small number change the color/bg back to normal
            valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 150, color: '#000', delay });
            valueFrames = createFrame(valueFrames, {  type: 'bg', id: arrWithInitialIndex[y][1], duration: 150, backgroundColor: '#FFF', delay });
            delay += 150;
            stopIndex = y + 1;
        }
        // this element is in the right position
        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[stopIndex][1], duration: 150, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, {  type: 'bg', id: arrWithInitialIndex[stopIndex][1], duration: 150, backgroundColor: '#FF165D', delay });
        delay += 150;

        if(!swap) {
            for(let z = stopIndex - 1; z > 0; z--) {
                // this element is in the right position
                valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[z][1], duration: 150, color: '#FFF', delay });
                valueFrames = createFrame(valueFrames, {  type: 'bg', id: arrWithInitialIndex[z][1], duration: 150, backgroundColor: '#FF165D', delay });
                delay += 150;
            }
            break;
        }
    }
    // this element is in the right position
    valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[0][1], duration: 150, color: '#FFF', delay });
    valueFrames = createFrame(valueFrames, {  type: 'bg', id: arrWithInitialIndex[0][1], duration: 150, backgroundColor: '#FF165D', delay });
    delay += 150;

    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    return sortTimeline;
};

export const selectionSortFramesTest = arr => {
    //preparing frames array
    createEmptyFrames(arr.length);
    let delay = 0;
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    for(let x = 0; x < arr.length - 1; x++) {
        let minIndex = x;
        // frames.push(colorFrame('#FFF', arrWithInitialIndex[minIndex][1], 150, '#3EC1D3'));
        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[minIndex][1], duration: 150, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[minIndex][1], duration: 150, backgroundColor: '#3EC1D3', delay });
        delay += 150;

        for(let y = x + 1; y < arr.length; y++) {
            // frames.push(colorFrame('#FFF', arrWithInitialIndex[y][1], 150, '#FF9A00'));
            valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 150, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[y][1], duration: 150, backgroundColor: '#FF9A00', delay });
            delay += 150;

            if(arrWithInitialIndex[y][0] < arrWithInitialIndex[minIndex][0]) {
                // frames.push(colorFrame('#000', arrWithInitialIndex[minIndex][1], 50, '#FFF'));
                valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[minIndex][1], duration: 50, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[minIndex][1], duration: 50, backgroundColor: '#FFF', delay });
                delay += 50;
                minIndex = y;
                // frames.push(colorFrame('#FFF', arrWithInitialIndex[y][1], 50, '#3EC1D3'));
                valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 50, color: '#FFF', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[y][1], duration: 50, backgroundColor: '#3EC1D3', delay });
                delay += 50;
            } else if(y !== minIndex) {
                // frames.push(colorFrame('#000', arrWithInitialIndex[y][1], 100, '#FFF'));
                valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 100, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[y][1], duration: 100, backgroundColor: '#FFF', delay });
                delay += 100;
            }
        }
        // frames.push({
        //     type: 'move',
        //     duration: 150,
        //     xNewPos: minIndex,
        //     xId: arrWithInitialIndex[x][1],
        //     yNewPos: x,
        //     yId: arrWithInitialIndex[minIndex][1]
        // });
        boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[x][1], duration: 150, newIndex: minIndex, delay });
        boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[minIndex][1], duration: 150, newIndex: x, delay });
        delay += 150;

        // frames.push(colorFrame('#FFF', arrWithInitialIndex[minIndex][1], 50, '#FF165D'));
        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[minIndex][1], duration: 50, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[minIndex][1], duration: 50, backgroundColor: '#FF165D', delay });
        delay += 50;

        const xValue = arrWithInitialIndex[x];
        arrWithInitialIndex[x] = arrWithInitialIndex[minIndex];
        arrWithInitialIndex[minIndex] = xValue;
    }
    // frames.push(colorFrame('#FFF', arrWithInitialIndex[arr.length - 1][1], 50, '#FF165D'));
    valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[arr.length - 1][1], duration: 50, color: '#FFF', delay });
    valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[arr.length - 1][1], duration: 50, backgroundColor: '#FF165D', delay });
    delay += 50;

    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    return sortTimeline;
};