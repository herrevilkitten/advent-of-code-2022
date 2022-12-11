import * as fs from "fs";

const data = fs.readFileSync("./day8.txt", "utf8");
const lines = data.split(/\n/);

interface Tree {
  height: number;
  seen: boolean;
}

const grid: Tree[][] = [];

const gridHeight = lines.length;
const gridWidth = lines[0].length;
lines.forEach((row) => {
  grid.push(
    row.split("").map((value) => ({ height: Number(value), seen: false }))
  );
});

console.log(`Forest is ${gridWidth} x ${gridHeight}`);
const outerEdge = 2 * gridWidth + 2 * (gridHeight - 2);
console.log(`Outer edge is ${outerEdge} trees`);

let total = 0;

for (let row = 0; row < gridHeight; ++row) {
  // Left to right
  let highest = -1;
  for (let col = 0; col < gridWidth; ++col) {
    const { height } = grid[row][col];
    if (height > highest) {
      if (!grid[row][col].seen) {
        grid[row][col].seen = true;
        total++;
      }
      highest = height;
    }
  }

  // Right to left
  highest = -1;
  for (let col = gridWidth - 1; col > 0; --col) {
    const { height } = grid[row][col];
    if (height > highest) {
      if (!grid[row][col].seen) {
        grid[row][col].seen = true;
        total++;
      }
      highest = height;
    }
  }
}

for (let col = 0; col < gridHeight; ++col) {
  // Top to bottom
  let highest = -1;
  for (let row = 0; row < gridHeight; ++row) {
    const { height } = grid[row][col];
    if (height > highest) {
      if (!grid[row][col].seen) {
        grid[row][col].seen = true;
        total++;
      }
      highest = height;
    }
  }

  // Bottom to top
  highest = -1;
  for (let row = gridHeight - 1; row > 0; --row) {
    const { height } = grid[row][col];
    if (height > highest) {
      if (!grid[row][col].seen) {
        grid[row][col].seen = true;
        total++;
      }
      highest = height;
    }
  }
}

console.log(`Total seen is ${total} / ${gridWidth * gridHeight}`);

function calculateScenicScore(gridRow: number, gridCol: number) {
  const height = grid[gridRow][gridCol].height;
  // Left
  let left = 0;
  for (let col = gridCol - 1; col > -1; --col) {
    left = left + 1;
    if (grid[gridRow][col].height >= height) {
      break;
    }
  }

  let right = 0;
  for (let col = gridCol + 1; col < gridWidth; ++col) {
    right = right + 1;
    if (grid[gridRow][col].height >= height) {
      break;
    }
  }

  let up = 0;
  for (let row = gridRow - 1; row > -1; --row) {
    up = up + 1;
    if (grid[row][gridCol].height >= height) {
      break;
    }
  }

  let down = 0;
  for (let row = gridRow + 1; row < gridHeight; ++row) {
    down = down + 1;
    if (grid[row][gridCol].height >= height) {
      break;
    }
  }

  return {
    total: left * right * up * down,
    left,
    right,
    up,
    down,
    row: gridRow,
    col: gridCol,
    height,
  };
}

let scenicScore = 0;
for (let row = 1; row < gridHeight - 1; ++row) {
  for (let col = 1; col < gridWidth - 1; ++col) {
    const score = calculateScenicScore(row, col);
    if (score.total > scenicScore) {
      console.log(score);
      scenicScore = score.total;
    }
  }
}

console.log(`Highest scenic score is ${scenicScore}`);
