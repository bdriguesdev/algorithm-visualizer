const m = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
];
export const breadthFirstSearchFrames = target => {
    let frames = [];
    let nodesLeftLayer = 1;
    let nodesNextLayer = 0;
    let count = 0;
    let reachedEnd = false;
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
    if(reachedEnd) {
        return count;
    }
    return false;
};