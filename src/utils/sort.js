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

export const insertionSortFrames = arr => {
    let frames = [];
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    frames.push(colorFrame('#FFF', 0, 150, '#FF165D'));
    for(let x = 1; x < arr.length; x++) {
        let value = arrWithInitialIndex[x];
        //change color of elementValue
        frames.push(colorFrame('#FFF', x, 150, '#FF9A00'));
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
        frames.push(colorFrame('#FFF', x, 150, '#FF165D'));
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
            frames.push(colorFrame('#FFF', arrWithInitialIndex[y][1], 150, '#FF9A00', arrWithInitialIndex[y + 1][1]));
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
            frames.push(colorFrame('#000', arrWithInitialIndex[y][1], 150, '#FFF'));
            stopIndex = y + 1;
        }
        frames.push(colorFrame('#FFF', arrWithInitialIndex[stopIndex][1], 150, '#FF165D'));
        if(!swap) {
            for(let z = stopIndex - 1; z > 0; z--) {
                frames.push(colorFrame('#FFF', arrWithInitialIndex[z][1], 150, '#FF165D'));
            }
            break;
        }
    }
    frames.push(colorFrame('#FFF', arrWithInitialIndex[0][1], 150, '#FF165D'));
    return frames;
};

export const selectionSortFrames = arr => {
    let frames = [];
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    for(let x = 0; x < arr.length - 1; x++) {
        let minIndex = x;
        frames.push(colorFrame('#FFF', arrWithInitialIndex[minIndex][1], 150, '#3EC1D3'));
        for(let y = x + 1; y < arr.length; y++) {
            frames.push(colorFrame('#FFF', arrWithInitialIndex[y][1], 150, '#FF9A00'));
            if(arrWithInitialIndex[y][0] < arrWithInitialIndex[minIndex][0]) {
                frames.push(colorFrame('#000', arrWithInitialIndex[minIndex][1], 50, '#FFF'));
                minIndex = y;
                frames.push(colorFrame('#FFF', arrWithInitialIndex[y][1], 50, '#3EC1D3'));
            } else if(y !== minIndex) {
                frames.push(colorFrame('#000', arrWithInitialIndex[y][1], 100, '#FFF'));
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
        frames.push(colorFrame('#FFF', arrWithInitialIndex[minIndex][1], 50, '#FF165D'));
        const xValue = arrWithInitialIndex[x];
        arrWithInitialIndex[x] = arrWithInitialIndex[minIndex];
        arrWithInitialIndex[minIndex] = xValue;
    }
    frames.push(colorFrame('#FFF', arrWithInitialIndex[arr.length - 1][1], 50, '#FF165D'));
    return frames;
};

export const heapSortFrames = arr => {
    let frames = [];
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });
    const heapify = (index, size) => {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let max = index;
        frames.push(colorFrame('#FFF', arrWithInitialIndex[index][1], 100, '#FF9A00'));
        if(right < size && arrWithInitialIndex[right][0] > arrWithInitialIndex[max][0]) {
            max = right;
        }
        if(left < size && arrWithInitialIndex[left][0] > arrWithInitialIndex[max][0]) {
            max = left;
        }
        if(max !== index) {
            const swap = arrWithInitialIndex[max];
            frames.push({
                type: 'move',
                duration: 150,
                xNewPos: index,
                xId: arrWithInitialIndex[max][1],
                yNewPos: max,
                yId: arrWithInitialIndex[index][1]
            });
            arrWithInitialIndex[max] = arrWithInitialIndex[index];
            arrWithInitialIndex[index] = swap;

            heapify(max, size);
        } else {
            frames.push(colorFrame('#000', arrWithInitialIndex[index][1], 100, '#FFF'));
        }
    };
    //create a max heap with the array
    for(let x = Math.floor(arr.length / 2); x >= 0; x--) {
        heapify(x, arr.length);
    }
    // extract the sorted arr
    for(let x = arr.length - 1; x > 0; x--) {
        const swap = arrWithInitialIndex[0]
        frames.push(colorFrame('#FFF', arrWithInitialIndex[0][1], 200, '#3EC1D3'));
        frames.push({
            type: 'move',
            duration: 150,
            xNewPos: x,
            xId: arrWithInitialIndex[0][1],
            yNewPos: 0,
            yId: arrWithInitialIndex[x][1]
        });
        arrWithInitialIndex[0] = arrWithInitialIndex[x];
        arrWithInitialIndex[x] = swap;
        frames.push(colorFrame('#FFF', arrWithInitialIndex[x][1], 50, '#FF165D'));
        heapify(0, x);
    }
    frames.push(colorFrame('#FFF', arrWithInitialIndex[0][1], 50, '#FF165D'));
    return frames;
};

export const mergeSortFrames = arr => {
    let frames = [];
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
                frames.push(colorFrame('#FFF', k, 200, '#FF9A00'));
                if(arrWithInitialIndex[k][0] !== leftArray[i][0] && arrWithInitialIndex[k][1] !== leftArray[i][1]) {
                    frames.push({
                        type: 'height',
                        duration: 300,
                        xId: k,
                        xHeight: leftArray[i][0],
                        arrIndex: arrWithInitialIndex.slice(),
                        color: lastMerge? '#FF165D': '',
                        k
                    });
                } else if(lastMerge) {
                    frames.push(colorFrame('#FFF', k, 200, '#FF165D'));
                }
                arrWithInitialIndex[k] = leftArray[i];
                i++;
            } else {
                frames.push(colorFrame('#FFF', k, 200, '#FF9A00'));
                if(arrWithInitialIndex[k][0] !== rightArray[j][0] && arrWithInitialIndex[k][1] !== rightArray[j][1]) {
                    frames.push({
                        type: 'height',
                        duration: 300,
                        xId: k,
                        xHeight: rightArray[j][0],
                        arrIndex: arrWithInitialIndex.slice(),
                        color: lastMerge? '#FF165D': '',
                        k
                    });
                } else if(lastMerge) {
                    frames.push(colorFrame('#FFF', k, 200, '#FF165D'));
                }
                arrWithInitialIndex[k] = rightArray[j];
                j++;
            }
            if(!lastMerge) frames.push(colorFrame('#000', k, 200, '#FFF'));
            k++;
        }
        
        while(i < leftArray.length) {
            frames.push(colorFrame('#FFF', k, 200, '#FF9A00'));
            if(arrWithInitialIndex[k][0] !== leftArray[i][0] && arrWithInitialIndex[k][1] !== leftArray[i][1]) {
                frames.push({
                    type: 'height',
                    duration: 300,
                    xId: k,
                    xHeight: leftArray[i][0],
                    arrIndex: arrWithInitialIndex.slice(),
                    color: lastMerge? '#FF165D': '',
                    k
                });
            } else if(lastMerge) {
                frames.push(colorFrame('#FFF', k, 200, '#FF165D'));
            }
            arrWithInitialIndex[k] = leftArray[i];
            if(!lastMerge) frames.push(colorFrame('#000', k, 200, '#FFF'));
            k++;
            i++;
        }
        while(j < rightArray.length) {
            frames.push(colorFrame('#FFF', k, 200, '#FF9A00'));
            if(arrWithInitialIndex[k][0] !== rightArray[j][0] && arrWithInitialIndex[k][1] !== rightArray[j][1]) {
                frames.push({
                    type: 'height',
                    duration: 300,
                    xId: k,
                    xHeight: rightArray[j][0],
                    arrIndex: arrWithInitialIndex.slice(),
                    color: lastMerge? '#FF165D': '',
                    k
                });
            } else if(lastMerge) {
                frames.push(colorFrame('#FFF', k, 200, '#FF165D'));
            }
            arrWithInitialIndex[k] = rightArray[j];
            if(!lastMerge) frames.push(colorFrame('#000', k, 200, '#FFF'));
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
    return frames;
};

export const quickSortFrames = arr => {
    let frames = [];
    const arrWithInitialIndex = arr.map((value, index) => {
        return [value, index];
    });

    const swap = (indexOne, indexTwo) => {
        if(indexOne !== indexTwo) {
            frames.push({
                type: 'move',
                duration: 200,
                xNewPos: indexTwo,
                xId: arrWithInitialIndex[indexOne][1],
                yNewPos: indexOne,
                yId: arrWithInitialIndex[indexTwo][1]
            });
        }
        frames.push(colorFrame('#000', arrWithInitialIndex[indexTwo][1], 200, '#FFF'));
        const swapElement = arrWithInitialIndex[indexOne];
        arrWithInitialIndex[indexOne] = arrWithInitialIndex[indexTwo];
        arrWithInitialIndex[indexTwo] = swapElement;
    };

    const partition = (l,r) => {
        const pivot = arrWithInitialIndex[r];
        frames.push(colorFrame('#FFF', pivot[1], 200, '#FF9A00'));
        let i = l - 1;
        for(let j = l; j < r; j++) {
            frames.push(colorFrame('#FFF', arrWithInitialIndex[j][1], 200, '#3EC1D3'));
            if(arrWithInitialIndex[j][0] <= pivot[0]) {
                i++;
                swap(i, j);
            } else {
                frames.push(colorFrame('#000', arrWithInitialIndex[j][1], 200, '#FFF'));
            } 
        }
        swap(r, i + 1);
        return i + 1;
    };

    const quickSort = (l, r) => {
        if(l < r) {
            const pivot = partition(l, r);
            frames.push(colorFrame('#FFF', arrWithInitialIndex[pivot][1], 200, '#FF165D'));

            quickSort(l, pivot - 1);
            quickSort(pivot + 1, r);
        } else if(l === r) {
            frames.push(colorFrame('#FFF', arrWithInitialIndex[r][1], 200, '#FF165D'));
        }
    };
    quickSort(0, arr.length - 1);
    // console.log(arrWithInitialIndex);   
    return frames;
};