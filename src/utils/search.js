export let m1 = [];
let value = 0;
for(let x = 0; x < 9; x++) {
    m1.push([]);
    for(let y = value; y < value + 16; y++) {
        m1[x].push(y);
    }
    value += 16;
}

const bgColorFrame = (x, duration, backgroundColor) => {
    return {
        type: 'bg',
        x,
        duration,
        backgroundColor
    }
}

export const breadthFirstSearchFrames = (m, [sr, sc], [tr, tc]) => {
    let frames = [];
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
            frames.push(bgColorFrame(`r${rr}c${cc}`, 50, '#FF9A00'));
            if(m[rr][cc] === m[tr][tc]) {
                reachedEnd = true;
            }
        }
        
    };

    rq.push(sr);
    cq.push(sc);
    visited[sr][sc] = true;
    frames.push(bgColorFrame(`r${sr}c${sc}`, 50, '#FF9A00'));
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
            frames.push(bgColorFrame(`r${pos[0]}c${pos[1]}`, 50, '#FF165D'));
        })
        frames.push(bgColorFrame(`r${tr}c${tc}`, 150, '#FF165D'));
    }
    return frames;
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
    path.forEach(([r, c]) => {
        frames.push(bgColorFrame(`r${r}c${c}`, 50, '#FF165D'));
    });
    return frames;
};