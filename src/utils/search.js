export let m = [];
let value = 0;
for(let x = 0; x < 9; x++) {
    m.push([]);
    for(let y = value; y < value + 16; y++) {
        m[x].push(y);
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

export const breadthFirstSearchFrames = ([sr, sc], [tr, tc]) => {
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
            else prev[rr][cc] = [r,c];
            
            rq.push(rr);
            cq.push(cc);
            visited[rr][cc] = true;
            frames.push(bgColorFrame(m[rr][cc], 50, '#FF9A00'));
            if(m[rr][cc] === m[tr][tc]) {
                reachedEnd = true;
                break;
            }
        }
        
    };

    rq.push(sr);
    cq.push(sc);
    visited[sr][sc] = true;
    frames.push(bgColorFrame(m[sr][sc], 50, '#FF9A00'));
    while(rq.length > 0) {
        const r = rq.shift();
        const c = cq.shift();

        exploreNeighbours(r, c);
        if(reachedEnd) break;
    }
    
    //path
    if(!reachedEnd) return false;
    else {
        let path = [];
        let antiInfinte = 0;
        for(let x = [tr, tc]; x !== null; x = prev[x[0]][x[1]]) {
            antiInfinte++;
            if(antiInfinte > 1000) break;
            path.push(x);
        }
        path.reverse();
        if(path[0][0] === sr && path[0][1] === sc) {
            path.forEach(pos => {
                frames.push(bgColorFrame(m[pos[0]][pos[1]], 50, '#FF165D'));
            })
            frames.push(bgColorFrame(m[tr][tc], 150, '#FF165D'));
            return frames;
        }
    }
};