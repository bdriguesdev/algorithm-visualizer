import anime from 'animejs';

const colorFrame = (color, x, duration, backgroundColor=null, y=null, ) => {
    return {
        type: 'color',
        x,
        y,
        duration,
        color,
        backgroundColor
    }
};

const sortTimeline = anime.timeline();

const addFramesToTimeline = (lineFrames, valueFrames, boxFrames) => {
    lineFrames.forEach(frame => {
        if(frame) sortTimeline.add(frame);
    });
    valueFrames.forEach(frame => {
        if(frame) sortTimeline.add(frame);
    });
    boxFrames.forEach(frame => {
        if(frame) sortTimeline.add(frame);
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
        frames[id].left.forEach(({ delay }) =>  {
            prevDelay += delay;
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
        frames[id].backgroundColor.forEach(({ delay }) =>  {
            prevDelay += delay;
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
        frames[id].color.forEach(({ delay }) =>  {
            prevDelay += delay;
        });
        frames[id].color.push({
            value: frame.color,
            duration: frame.duration,
            delay: frame.delay - prevDelay
        });
    } else {
        if(!frames[id]) frames[id] = {};
        frames[id].color = [{
                value: frame.color,
                duration: frame.duration,
                delay: frame.delay
        }];
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
        frames[id].duration = frame.duration;
        frames[id].direction = 'normal';
    }
    return frames;
};

export const insertionSortFramesTest = arr => {
    let lineFrames = [];
    let valueFrames = [];
    let boxFrames = [];
    let delay = 0;
    for(let y = 0; y < arr.length; y++) {
        lineFrames.push(null);
        valueFrames.push(null);
        boxFrames.push(null);
    }
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    // frames.push(colorFrame('#FFF', 0, 150, '#FF165D'));
    valueFrames = createFrame(valueFrames, { type: 'color',  id: 0, duration: 150, color: '#FFF', delay });
    valueFrames = createFrame(valueFrames, {  type: 'bg', id: 0, duration: 150, backgroundColor: '#FF165D', delay });
    delay += 150;
    for(let x = 1; x < arr.length; x++) {
        let value = arrWithInitialIndex[x];
        //change color of elementValue
        // frames.push(colorFrame('#FFF', x, 150, '#FF9A00'));
        valueFrames = createFrame(valueFrames, {  type: 'color', id: x, duration: 150, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, {  type: 'bg', id: x, duration: 150, backgroundColor: '#FF9A00', delay });
        delay += 150;
        let y = x - 1;
        while(y >= 0 && arrWithInitialIndex[y][0] > value[0]) {
            arrWithInitialIndex[y + 1] = arrWithInitialIndex[y];
            //change position of x and y
            // frames.push({
            //     type: 'move',
            //     duration: 250,
            //     xNewPos: y,
            //     xId: value[1],
            //     yNewPos: y + 1,
            //     yId: arrWithInitialIndex[y][1]
            // });
            boxFrames = createFrame(boxFrames, {  type: 'move', id: value[1], duration: 200, newIndex: y, delay });
            boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[y][1], duration: 200, newIndex: y + 1, delay });
            delay += 200;
            y--;
        }
        arrWithInitialIndex[y + 1] = value;
        //color to elementValue back to normal
        // frames.push(colorFrame('#FFF', x, 150, '#FF165D'));
        valueFrames = createFrame(valueFrames, {  type: 'color', id: x, duration: 150, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, {  type: 'bg', id: x, duration: 150, backgroundColor: '#FF165D', delay });
        delay += 150;
    }


    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    console.log(lineFrames, valueFrames, boxFrames);
    return sortTimeline; 
};