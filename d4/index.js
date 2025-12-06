const fs = require('fs');

const deltas = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
];

function isInBounds(x, y, matrix) {
  return x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length;
}

function getValidNeighbors(x, y, matrix, testFn) {
  const validNeighbors = deltas
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => isInBounds(nx, ny, matrix) && testFn(nx, ny, matrix));
  return validNeighbors;
}

function createValidNeighborMatrix(matrix) {
  let newMatrix = [];

  for (let i = 0; i < matrix.length; i++) {
    newMatrix[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '@') {
                const val = getValidNeighbors(i, j, matrix, (x, y, matrix) => matrix[x][y] === '@')
        newMatrix[i][j] = val.length < 4;
      } else {
        newMatrix[i][j] = false;
      }
    }
  }

  return newMatrix;
}

function solutionPart1(input) {
  const matrix = [];
  for (row of input) {
    matrix.push(row.split(''));
  }

  const validNeighbors = createValidNeighborMatrix(matrix);
  let removed = 0;
  for (let i = 0; i < validNeighbors.length; i++) {
    for (let j = 0; j < validNeighbors[i].length; j++) {
      if (validNeighbors[i][j]) {
        removed++;
      }
    }
  }
  return removed;
}

function removeItems(matrix, totalRemoved) {
  const validNeighbors = createValidNeighborMatrix(matrix);

  const newMatrix = matrix;

  let removed = 0;
  for (let i = 0; i < validNeighbors.length; i++) {
    for (let j = 0; j < validNeighbors[i].length; j++) {
      if (validNeighbors[i][j]) {
        removed++;
        newMatrix[i][j] = 'x';
      }
    }
  }

  if (removed == 0) {
    return totalRemoved;
  } else {
    return removeItems(newMatrix, totalRemoved + removed);
  }
}

function solutionPart2(input) {
  const matrix = [];
  for (row of input) {
    matrix.push(row.split(''));
  }
  const removed = removeItems(matrix, 0);
  return removed;
}

(() => {
  const input = fs.readFileSync("d4/input.txt", "utf-8").trim().split("\n");
  const sol1 = solutionPart1(input);
  console.log(`\n solution part 1: ${sol1}\n`);

  const sol2 = solutionPart2(input, 0);
  console.log(`\n solution part 2: ${sol2}\n`);
})();
