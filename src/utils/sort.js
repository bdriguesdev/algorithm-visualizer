import anime from 'animejs';

let sortTimeline = null;
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

const elementHeight = value => {
    const percentValue = 440 / 50;
    const height = value * percentValue;

    return {
        height: height + 'px'
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

const heightFrame = (frames, frame, id) => {
    const newHeight = elementHeight(frame.height).height;
    if(frames[id]) {
        let prevDelay = 0;
        frames[id].height.forEach(({ delay, duration }) => {
            prevDelay += delay + duration;
        });
        frames[id].height.push({
            value: newHeight,
            duration: frame.duration,
            delay: frame.delay - prevDelay
        });
    } else {
        frames[id] = {};
        frames[id].height = [{
            value: newHeight,
            duration: frame.duration,
            delay: frame.delay
        }];
    }
    return frames;
};

const innerHTMLFrame = (frames, frame, id) => {
    if(frames[id] && frames[id].innerHTML) {
        let prevDelay = 0
        frames[id].innerHTML.forEach(({ delay, duration }) =>  {
            prevDelay += delay + duration;
        });
        frames[id].innerHTML.push({
            value: frame.innerHTML,
            duration: frame.duration,
            delay: frame.delay - prevDelay,
            round: 1
        });
    } else {
        if(!frames[id]) frames[id] = {};
        frames[id].innerHTML = [{
            value: frame.innerHTML,
            duration: frame.duration,
            delay: frame.delay,
            round: 1
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
    } else if(frame.type === 'height') {
        if(!frames[id]) target = document.getElementById('line'+id);
        frames = heightFrame(frames, frame, id);
    } else if(frame.type === 'innerHTML') {
        if(!frames[id]) target = document.getElementById('value'+id);
        frames = innerHTMLFrame(frames, frame, id);
    }
    
    if(target) {
        frames[id].targets = target;
        frames[id].easing = 'easeInOutSine';
        frames[id].direction = 'normal';
    }
    return frames;
};

export const insertionSortFrames = arr => {
    sortTimeline = anime.timeline();
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

export const bubbleSortFrames = arr => {
    sortTimeline = anime.timeline();
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

export const selectionSortFrames = arr => {
    sortTimeline = anime.timeline();
    //preparing frames array
    createEmptyFrames(arr.length);
    let delay = 0;
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    for(let x = 0; x < arr.length - 1; x++) {
        let minIndex = x;
        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[minIndex][1], duration: 150, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[minIndex][1], duration: 150, backgroundColor: '#3EC1D3', delay });
        delay += 150;

        for(let y = x + 1; y < arr.length; y++) {
            valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 150, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[y][1], duration: 150, backgroundColor: '#FF9A00', delay });
            delay += 150;

            if(arrWithInitialIndex[y][0] < arrWithInitialIndex[minIndex][0]) {
                valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[minIndex][1], duration: 50, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[minIndex][1], duration: 50, backgroundColor: '#FFF', delay });
                delay += 50;
                minIndex = y;
                valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 50, color: '#FFF', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[y][1], duration: 50, backgroundColor: '#3EC1D3', delay });
                delay += 50;
            } else if(y !== minIndex) {
                valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[y][1], duration: 100, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[y][1], duration: 100, backgroundColor: '#FFF', delay });
                delay += 100;
            }
        }
        boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[x][1], duration: 150, newIndex: minIndex, delay });
        boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[minIndex][1], duration: 150, newIndex: x, delay });
        delay += 150;

        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[minIndex][1], duration: 50, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[minIndex][1], duration: 50, backgroundColor: '#FF165D', delay });
        delay += 50;

        const xValue = arrWithInitialIndex[x];
        arrWithInitialIndex[x] = arrWithInitialIndex[minIndex];
        arrWithInitialIndex[minIndex] = xValue;
    }
    valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[arr.length - 1][1], duration: 50, color: '#FFF', delay });
    valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[arr.length - 1][1], duration: 50, backgroundColor: '#FF165D', delay });
    delay += 50;

    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    return sortTimeline;
};

export const heapSortFrames = arr => {
    sortTimeline = anime.timeline();
    //preparing frames array
    createEmptyFrames(arr.length);
    let delay = 0;
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });

    const heapify = (index, size) => {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let max = index;

        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[index][1], duration: 100, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[index][1], duration: 100, backgroundColor: '#FF9A00', delay });
        delay += 100;

        if(right < size && arrWithInitialIndex[right][0] > arrWithInitialIndex[max][0]) {
            max = right;
        }
        if(left < size && arrWithInitialIndex[left][0] > arrWithInitialIndex[max][0]) {
            max = left;
        }
        if(max !== index) {
            const swap = arrWithInitialIndex[max];
            // 
            boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[max][1], duration: 150, newIndex: index, delay });
            boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[index][1], duration: 150, newIndex: max, delay });
            delay += 150;

            arrWithInitialIndex[max] = arrWithInitialIndex[index];
            arrWithInitialIndex[index] = swap;

            heapify(max, size);
        } else {
            valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[index][1], duration: 100, color: '#000', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[index][1], duration: 100, backgroundColor: '#FFF', delay });
            delay += 100;
        }
    };
    //create a max heap with the array
    for(let x = Math.floor(arr.length / 2); x >= 0; x--) {
        heapify(x, arr.length);
    }
    // extract the sorted arr
    for(let x = arr.length - 1; x > 0; x--) {
        const swap = arrWithInitialIndex[0]

        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[0][1], duration: 200, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[0][1], duration: 200, backgroundColor: '#3EC1D3', delay });
        delay += 200;

        boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[0][1], duration: 150, newIndex: x, delay });
        boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[x][1], duration: 150, newIndex: 0, delay });
        delay += 150;

        arrWithInitialIndex[0] = arrWithInitialIndex[x];
        arrWithInitialIndex[x] = swap;

        valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[x][1], duration: 50, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[x][1], duration: 50, backgroundColor: '#FF165D', delay });
        delay += 50;

        heapify(0, x);
    }
    valueFrames = createFrame(valueFrames, { type: 'color',  id: arrWithInitialIndex[0][1], duration: 50, color: '#FFF', delay });
    valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[0][1], duration: 50, backgroundColor: '#FF165D', delay });
    delay += 50;

    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    return sortTimeline;
};

export const mergeSortFrames = arr => {
    sortTimeline = anime.timeline();
    //preparing frames array
    createEmptyFrames(arr.length);
    let delay = 0;
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    //merge two sorted arrays(subarrays of arrWithInitialIndex)
    const merge = (left, middle, right) => {
        let i = 0;
        let j = 0
        let k = left;
        let lastMerge = left === 0 && right === arr.length - 1? true: false;

        let leftArray = [];
        for(let x = left; x <= middle; x++) {
            leftArray.push(arrWithInitialIndex[x]);
        }
        let rightArray = [];
        for(let y = middle + 1; y <= right; y++) {
            rightArray.push(arrWithInitialIndex[y]);
        }

        while(i < leftArray.length && j < rightArray.length) {
            if(leftArray[i][0] < rightArray[j][0]) {
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF9A00', delay });
                delay += 200;

                if(arrWithInitialIndex[k][0] !== leftArray[i][0] && arrWithInitialIndex[k][1] !== leftArray[i][1]) {
                    lineFrames = createFrame(lineFrames, { type: 'height', id: k, duration: 300, height: leftArray[i][0], delay });
                    valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 300, color: lastMerge? '#FFF': '#000', delay });
                    valueFrames = createFrame(valueFrames, { type: 'innerHTML', id: k, duration: 300, innerHTML: leftArray[i][0], delay });

                    if(lastMerge) {
                        valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 300, backgroundColor: '#FF165D', delay });
                    }
                    delay += 300;
                } else if(lastMerge) {
                    valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
                    valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF165D', delay });
                    delay += 200;
                }
                arrWithInitialIndex[k] = leftArray[i];
                i++;
            } else {
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF9A00', delay });
                delay += 200;

                if(arrWithInitialIndex[k][0] !== rightArray[j][0] && arrWithInitialIndex[k][1] !== rightArray[j][1]) {
                    lineFrames = createFrame(lineFrames, { type: 'height', id: k, duration: 300, height: rightArray[j][0], delay });
                    valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 300, color: lastMerge? '#FFF': '#000', delay });
                    valueFrames = createFrame(valueFrames, { type: 'innerHTML', id: k, duration: 300, innerHTML: rightArray[j][0], delay });
                    if(lastMerge) {
                        valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 300, backgroundColor: '#FF165D', delay });
                    }
                    delay += 300;
                } else if(lastMerge) {
                    valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
                    valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF165D', delay });
                    delay += 200;
                }
                arrWithInitialIndex[k] = rightArray[j];
                j++;
            }
            if(!lastMerge) {
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FFF', delay });
                delay += 200;
            }
            k++;
        }
        
        while(i < leftArray.length) {
            valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF9A00', delay });
            delay += 200;

            if(arrWithInitialIndex[k][0] !== leftArray[i][0] && arrWithInitialIndex[k][1] !== leftArray[i][1]) {
                lineFrames = createFrame(lineFrames, { type: 'height', id: k, duration: 300, height: leftArray[i][0], delay });
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 300, color: lastMerge? '#FFF': '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'innerHTML', id: k, duration: 300, innerHTML: leftArray[i][0], delay });

                if(lastMerge) {
                    valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 300, backgroundColor: '#FF165D', delay });
                }
                delay += 300;
            } else if(lastMerge) {
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF9A00', delay });
                delay += 200;
            }
            arrWithInitialIndex[k] = leftArray[i];
            if(!lastMerge)  {
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FFF', delay });
                delay += 200;
            }
            k++;
            i++;
        }
        while(j < rightArray.length) {
            valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF9A00', delay });
            delay += 200;

            if(arrWithInitialIndex[k][0] !== rightArray[j][0] && arrWithInitialIndex[k][1] !== rightArray[j][1]) {
                lineFrames = createFrame(lineFrames, { type: 'height', id: k, duration: 300, height: rightArray[j][0], delay });
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 300, color: lastMerge? '#FFF': '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'innerHTML', id: k, duration: 300, innerHTML: rightArray[j][0], delay });

                if(lastMerge) {
                    valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 300, backgroundColor: '#FF165D', delay });
                }
                delay += 300;
            } else if(lastMerge) {
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#FFF', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FF165D', delay });
                delay += 200;
            }
            arrWithInitialIndex[k] = rightArray[j];

            if(!lastMerge) {
                valueFrames = createFrame(valueFrames, { type: 'color', id: k, duration: 200, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id: k, duration: 200, backgroundColor: '#FFF', delay });
                delay += 200;
            }
            k++;
            j++;
        }
    };
    //sort a array
    const sort = (left, right) => {
        if(left < right) {
            const middle = Math.floor((left + right) / 2);

            sort(left, middle);
            sort(middle + 1, right);

            merge(left, middle, right);
        }
    };
    sort(0, arr.length - 1);

    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    return sortTimeline;
};

export const quickSortFrames = arr => {
    sortTimeline = anime.timeline();
    //preparing frames array
    createEmptyFrames(arr.length);
    let delay = 0;
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });

    const swap = (indexOne, indexTwo) => {
        if(indexOne !== indexTwo) {
            boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[indexOne][1], duration: 200, newIndex: indexTwo, delay });
            boxFrames = createFrame(boxFrames, {  type: 'move', id: arrWithInitialIndex[indexTwo][1], duration: 200, newIndex: indexOne, delay });
            delay += 200;
        }
        valueFrames = createFrame(valueFrames, { type: 'color', id: arrWithInitialIndex[indexTwo][1], duration: 200, color: '#000', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: arrWithInitialIndex[indexTwo][1], duration: 200, backgroundColor: '#FFF', delay });
        delay += 200;

        const swapElement = arrWithInitialIndex[indexOne];
        arrWithInitialIndex[indexOne] = arrWithInitialIndex[indexTwo];
        arrWithInitialIndex[indexTwo] = swapElement;
    };

    const partition = (l,r) => {
        const pivot = arrWithInitialIndex[r];
        valueFrames = createFrame(valueFrames, { type: 'color', id: pivot[1], duration: 200, color: '#FFF', delay });
        valueFrames = createFrame(valueFrames, { type: 'bg', id: pivot[1], duration: 200, backgroundColor: '#FF9A00', delay });
        delay += 200;

        let i = l - 1;
        for(let j = l; j < r; j++) {
            valueFrames = createFrame(valueFrames, { type: 'color', id:  arrWithInitialIndex[j][1], duration: 200, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id:  arrWithInitialIndex[j][1], duration: 200, backgroundColor: '#3EC1D3', delay });
            delay += 200;

            if(arrWithInitialIndex[j][0] <= pivot[0]) {
                i++;
                swap(i, j);
            } else {
                valueFrames = createFrame(valueFrames, { type: 'color', id:  arrWithInitialIndex[j][1], duration: 200, color: '#000', delay });
                valueFrames = createFrame(valueFrames, { type: 'bg', id:  arrWithInitialIndex[j][1], duration: 200, backgroundColor: '#FFF', delay });
                delay += 200;
            } 
        }
        swap(r, i + 1);
        return i + 1;
    };

    const quickSort = (l, r) => {
        if(l < r) {
            const pivot = partition(l, r);
            valueFrames = createFrame(valueFrames, { type: 'color', id:  arrWithInitialIndex[pivot][1], duration: 200, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id:  arrWithInitialIndex[pivot][1], duration: 200, backgroundColor: '#FF165D', delay });
            delay += 200;

            quickSort(l, pivot - 1);
            quickSort(pivot + 1, r);
        } else if(l === r) {
            valueFrames = createFrame(valueFrames, { type: 'color', id:  arrWithInitialIndex[r][1], duration: 200, color: '#FFF', delay });
            valueFrames = createFrame(valueFrames, { type: 'bg', id:  arrWithInitialIndex[r][1], duration: 200, backgroundColor: '#FF165D', delay });
            delay += 200;
        }
    };
    quickSort(0, arr.length - 1);

    //here create a timeline and return it
    addFramesToTimeline(lineFrames, valueFrames, boxFrames);
    return sortTimeline;
};