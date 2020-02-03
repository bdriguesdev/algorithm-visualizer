import anime from 'animejs';

export let m1 = [];
let value = 0;
for(let x = 0; x < 9; x++) {
    m1.push([]);
    for(let y = value; y < value + 16; y++) {
        m1[x].push(y);
    }
    value += 16;
};

let gridFrames = [];
let searchTimeline = anime.timeline();

const createEmptyFrames = (rlength, clength) => {
    gridFrames = [];
    for(let x = 0; x < rlength; x++) {
        gridFrames.push([]);
        for(let y = 0; y < clength; y++) {
            gridFrames[x].push(null);
        }
    }
};

const addFramesToTimeline = (gridFrames) => {
    gridFrames.forEach(row => {
        row.forEach(frame => {
            if(frame) searchTimeline.add(frame, 0);
        });
    });
};

const bgFrame = (frames, frame, r, c) => {
    if(frames[r][c] && frames[r][c].backgroundColor) {
        let prevDelay = 0
        frames[r][c].backgroundColor.forEach(({ delay, duration }) =>  {
            prevDelay += delay + duration;
        });
        frames[r][c].backgroundColor.push({
            value: frame.backgroundColor,
            duration: frame.duration,
            delay: frame.delay - prevDelay
        });
    } else {
        if(!frames[r][c]) frames[r][c] = {};
        frames[r][c].backgroundColor = [{
                value: frame.backgroundColor,
                duration: frame.duration,
                delay: frame.delay
        }];
    }
    return frames;
};

const createFrame = (frames, frame) => {
    let target = null;
    const { id, gridId } = frame;
    const [r, c] = gridId;

    if(frame.type === 'bg') {
        if(!frames[r][c]) target = document.getElementById(id);
        frames = bgFrame(frames, frame, r, c);
    } 
    
    if(target) {
        frames[r][c].targets = target;
        frames[r][c].easing = 'easeInOutSine';
        frames[r][c].direction = 'normal';
    }
    return frames;
};

const bgColorFrame = (x, duration, backgroundColor) => {
    return {
        type: 'bg',
        x,
        duration,
        backgroundColor
    }
};

export const breadthFirstSearchFrames = (m, [sr, sc], [tr, tc]) => {
    //creating frames matrix full of nulls(size m.length)
    createEmptyFrames(m.length, m[0].length);
    let delay = 0;
    let reachedEnd = false;
    const prev = m.map(row => {
        row = row.map(() => null);
        return row
    });
    const rq = [];
    const cq = [];
    const visited = m.map(row => {
        row = row.map(() => null);
        return row;
    });

    const exploreNeighbours = (r, c) => {
        const dr = [-1, +1, 0, 0];
        const dc = [0, 0, +1, -1];

        for(let x = 0; x < 4; x++) {
            const rr = r + dr[x];
            const cc = c + dc[x];

            if(rr < 0 || cc < 0) continue;
            if(rr >= m.length || cc >= m[0].length) continue;

            //if theres a block cell I need to check if it here
            if(visited[rr][cc]) continue;
            else if(m[rr][cc] === '#') continue;
            else prev[rr][cc] = [r,c];
            
            rq.push(rr);
            cq.push(cc);
            visited[rr][cc] = true;
            // frames.push(bgColorFrame(`r${rr}c${cc}`, 50, '#FF9A00'));
            gridFrames = createFrame(gridFrames, { type: 'bg', id: `r${rr}c${cc}`, duration: 50, backgroundColor: '#FF9A00', gridId: [rr,cc], delay });
            delay += 50;

            if(m[rr][cc] === m[tr][tc]) {
                reachedEnd = true;
            }
        }
        
    };

    rq.push(sr);
    cq.push(sc);
    visited[sr][sc] = true;
    // frames.push(bgColorFrame(`r${sr}c${sc}`, 50, '#FF9A00'));
    gridFrames = createFrame(gridFrames, { type: 'bg', id: `r${sr}c${sc}`, duration: 50, backgroundColor: '#FF9A00', gridId: [sr,sc], delay });
    delay += 50;

    while(rq.length > 0) {
        const r = rq.shift();
        const c = cq.shift();

        if(reachedEnd) break;
        exploreNeighbours(r, c);
    }
    
    //path
    let path = [];
    for(let x = [tr, tc]; x !== null; x = prev[x[0]][x[1]]) {
        path.push(x);
    }
    path.reverse();
    if(path[0][0] === sr && path[0][1] === sc) {
        path.forEach(pos => {
            // frames.push(bgColorFrame(`r${pos[0]}c${pos[1]}`, 50, '#FF165D'));
            gridFrames = createFrame(gridFrames, { type: 'bg', id: `r${pos[0]}c${pos[1]}`, duration: 50, backgroundColor: '#FF165D', gridId: [pos[0],pos[1]], delay });
            delay += 50;
        })
        // frames.push(bgColorFrame(`r${tr}c${tc}`, 150, '#FF165D'));
        gridFrames = createFrame(gridFrames, { type: 'bg', id: `r${tr}c${tc}`, duration: 150, backgroundColor: '#FF165D', gridId: [tr,tc], delay });
        delay += 150;
    }

    //creating and returning a timeline
    addFramesToTimeline(gridFrames);
    return searchTimeline;
};

export const depthFirstSearchFrames = (m, [sr, sc], [tr, tc]) => {
    let frames = [];
    const dr = [-1, 0, +1, 0];
    const dc = [0, +1, 0, -1];
    const visited = m.map(row => {
        row = row.map(() => null);
        return row;
    });
    const prev = m.map(row => {
        row = row.map(() => null);
        return row
    });
    let reachedEnd = false;
    const getNodes = (r, c) => {
        let nodes = [];
        for(let x = 0; x < 4; x++) {
            const rr = r + dr[x];
            const cc = c + dc[x];
            
            if(rr < 0 || cc < 0) continue;
            else if(rr >= m.length || cc >= m[0].length) continue;
            else if(visited[rr][cc]) continue;
            else if(m[rr][cc] === '#') continue;
            nodes.push([rr, cc]);
            prev[rr][cc] = [r, c];
        }
        return nodes;
    };
    const dfs = (r, c) => {
        frames.push(bgColorFrame(`r${r}c${c}`, 50, '#FF9A00'));
        visited[r][c] = true;
        const nodes = getNodes(r, c);
        for(let y = 0; y < nodes.length; y++) {
            if(nodes[y][0] === tr && nodes[y][1] === tc) {
                reachedEnd = true;
            }
            if(reachedEnd) break;
            if(!visited[nodes[y][0]][nodes[y][1]]) dfs(nodes[y][0], nodes[y][1]);
        }
    };
    dfs(sr, sc);
    //path
    let path = [];
    for(let x = [tr, tc]; x !== null; x = prev[x[0]][x[1]]) {
        path.push(x);
    }
    path.reverse();
    path.forEach(([r, c]) => {
        frames.push(bgColorFrame(`r${r}c${c}`, 50, '#FF165D'));
    });
    return frames;
};