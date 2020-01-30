export let m = [];
let value = 0;
for(let x = 0; x < 9; x++) {
    m.push([]);
    for(let y = value; y < value + 16; y++) {
        m[x].push(y);
    }
    value += 16;
}
export const breadthFirstSearchFrames = target => {
    let frames = [];
    let nodesLeftLayer = 1;
    let nodesNextLayer = 0;
    let count = 0;
    let reachedEnd = false;
    const prev = m.map(row => {
        row = row.map(() => null);
        return row
    });
    const sr = 0; 
    const sc = 0; 
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

            if(visited[rr][cc]) continue;
            else prev[rr][cc] = m[rr][cc];

            //if theres a block cell I need to check if it here

            rq.push(rr);
            cq.push(cc);
            visited[rr][cc] = true;
            nodesNextLayer++;
        }
        
    };

    rq.push(sr);
    cq.push(sc);
    visited[sr][sc] = true;
    while(rq.length > 0) {
        const r = rq.shift();
        const c = cq.shift();

        if(m[r][c] === target) reachedEnd = true;
        exploreNeighbours(r, c);
        //i think i don't need those for what i'm doing
        nodesLeftLayer--;
        if(nodesLeftLayer === 0) {
            nodesLeftLayer = nodesNextLayer;
            nodesNextLayer = 0;
            count++;
        }
    }
    
    //path
    prev[0][0] = 1;
    let path = []; 
};