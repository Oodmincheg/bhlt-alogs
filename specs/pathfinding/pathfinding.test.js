// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");
const BY_NONE = 'BY_NONE'
const BY_A = 'BY_A'
const BY_B = 'BY_B'
const CLOSED = 1

const generateVisited = (maze) => {
  return maze.map((row, y) =>
      row.map((origin, x) => ({
        closed: origin === 1,
        length: 0,
        visited: BY_NONE,
        x,
        y
      }))
  );
}
const getNeighbors = (visited, x, y) => {
  const neighbors = [];

  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    // left
    neighbors.push(visited[y - 1][x]);
  }

  if (y + 1 < visited[0].length && !visited[y + 1][x].closed) {
    // right
    neighbors.push(visited[y + 1][x]);
  }

  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    // up
    neighbors.push(visited[y][x - 1]);
  }

  if (x + 1 < visited.length && !visited[y][x + 1].closed) {
    // down
    neighbors.push(visited[y][x + 1]);
  }

  return neighbors;
};
function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  // code goes here
  const visited = generateVisited(maze)
  visited[yA][xA].visited = BY_A
  visited[yB][xB].visited = BY_B
  const aQueue = [visited[yA][xA]]
  const bQueue = [visited[yB][xB]]
  let iteration = 0
  while (aQueue.length && bQueue.length) {
    iteration++
    let aNeighbors = []

    while(aQueue.length) {
      const coordinate = aQueue.shift()
      aNeighbors = [
          ...aNeighbors,
        ...getNeighbors(visited, coordinate.x, coordinate.y)
      ]
    }

    for(let i = 0; i < aNeighbors.length; i++) {
      const coordinate = aNeighbors[i]
      if(coordinate.visited === BY_B) {
        return coordinate.length + iteration
      } else if(coordinate.visited === BY_NONE) {
        coordinate.visited = BY_A
        coordinate.length = iteration
        aQueue.push(coordinate)
      }

    }
    // b neighbors
    let bNeighbors = []

    while(bQueue.length) {
      const coordinate = bQueue.shift()
      bNeighbors = [
        ...bNeighbors,
        ...getNeighbors(visited, coordinate.x, coordinate.y)
      ]
    }

    for(let i = 0; i < bNeighbors.length; i++) {
      const coordinate = bNeighbors[i]
      if(coordinate.visited === BY_A) {
        return coordinate.length + iteration
      } else if(coordinate.visited === BY_NONE) {
        coordinate.visited = BY_B
        coordinate.length = iteration
        bQueue.push(coordinate)
      }

    }
  }
  console.log(visited)
  return -1
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0]
  ];
  it.skip("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2]
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe.skip("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ];
  it.skip("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2]
  ];
  it.skip("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
