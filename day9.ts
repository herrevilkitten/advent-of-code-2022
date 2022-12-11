import * as fs from "fs";

const data = fs.readFileSync("./day9.txt", "utf8");
const lines = data.split(/\n/);

const visited: { [row: number]: { [col: number]: true } } = {};
visited[0] = { 0: true };
let totalVisited = 1;

type Direction = "U" | "D" | "L" | "R";
interface Command {
  direction: Direction;
  distance: number;
}
interface Position {
  row: number;
  col: number;
}

class Knot {
  constructor(
    public row = 0,
    public column = 0,
    public previous?: Knot,
    public depth = 0
  ) {}

  private move(rowDelta = 0, columnDelta = 0) {
    this.row = this.row + rowDelta;
    this.column = this.column + columnDelta;

    if (this.previous) {
      if (this.previous.distanceTo(this) >= 2) {
        this.previous.moveTo(this);
      }
    }
  }

  moveRight() {
    this.move(0, 1);
  }

  moveLeft() {
    this.move(0, -1);
  }

  moveUp() {
    this.move(-1, 0);
  }

  moveDown() {
    this.move(1, 0);
  }

  moveUpRight() {
    this.move(-1, 1);
  }

  moveUpLeft() {
    this.move(-1, -1);
  }

  moveDownRight() {
    this.move(1, 1);
  }

  moveDownLeft() {
    this.move(1, -1);
  }

  distanceTo(other: Knot) {
    return Math.sqrt(
      Math.pow(this.row - other.row, 2) +
        Math.pow(this.column - other.column, 2)
    );
  }

  moveTo(other: Knot) {
    if (other.row === this.row) {
      if (other.column > this.column) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
    } else if (other.column === this.column) {
      if (other.row > this.row) {
        this.moveDown();
      } else {
        this.moveUp();
      }
    } else {
      // Diag
      if (other.row === this.row + 2) {
        if (other.column > this.column) {
          this.moveDownRight();
        } else if (other.column < this.column) {
          this.moveDownLeft();
        }
      } else if (other.row === this.row + 1) {
        if (other.column > this.column) {
          this.moveDownRight();
        } else if (other.column < this.column) {
          this.moveDownLeft();
        }
      } else if (other.row === this.row - 1) {
        if (other.column > this.column) {
          this.moveUpRight();
        } else if (other.column < this.column) {
          this.moveUpLeft();
        }
      } else if (other.row === this.row - 2) {
        if (other.column > this.column) {
          this.moveUpRight();
        } else if (other.column < this.column) {
          this.moveUpLeft();
        }
      }
    }
  }

  toString() {
    return `(#${this.depth}: ${this.row}, ${this.column})`;
  }
}

class Rope {
  tail!: Knot;
  head!: Knot;
  visited: Set<string> = new Set<string>();
  total = 1;

  constructor(count = 2) {
    let previous: Knot | undefined = undefined;
    let head: Knot | undefined = undefined;
    for (let i = 0; i < count; ++i) {
      const knot: Knot = new Knot(0, 0, previous, i);
      if (!previous) {
        this.tail = knot;
      }
      previous = knot;
      head = knot;
    }

    this.head = head as Knot;
    this.visited.add("0,0");
  }

  moveRight(distance = 1) {
    if (this.head) {
      for (let i = 0; i < distance; ++i) {
        this.head.moveRight();
        this.visit();
      }
    }
  }

  moveLeft(distance = 1) {
    if (this.head) {
      for (let i = 0; i < distance; ++i) {
        this.head.moveLeft();
        this.visit();
      }
    }
  }

  moveUp(distance = 1) {
    if (this.head) {
      for (let i = 0; i < distance; ++i) {
        this.head.moveUp();
        this.visit();
      }
    }
  }

  moveDown(distance = 1) {
    if (this.head) {
      for (let i = 0; i < distance; ++i) {
        this.head.moveDown();
        this.visit();
      }
    }
  }

  visit() {
    const { row, column } = this.tail;

    const key = `${row},${column}`;
    if (!this.visited.has(key)) {
      this.visited.add(key);
      this.total++;
    }
  }

  runCommand(command: Command) {
    const { direction, distance } = command;
    switch (direction) {
      case "R":
        this.moveRight(distance);
        break;
      case "L":
        this.moveLeft(distance);
        break;
      case "D":
        this.moveDown(distance);
        break;
      case "U":
        this.moveUp(distance);
        break;
    }
  }

  runScript(commands: Command[]) {
    commands.forEach((command) => {
      this.runCommand(command);
    });
  }

  toString() {
    let node: Knot | undefined = this.head;
    let output: string[] = [];
    while (!!node) {
      output.push(`Knot #${node.depth} ${node}`);
      node = node.previous;
    }
    return output.join(" -> ");
  }
}

const commands: Command[] = [];
lines.forEach((line) => {
  const parts = line.split(" ");
  const direction = parts[0] as Direction;
  const distance = Number(parts[1]);
  commands.push({ direction, distance });
});

let head: Position = { row: 0, col: 0 };
let tail: Position = { row: 0, col: 0 };

function checkAndMoveTail() {
  const distance = Math.sqrt(
    Math.pow(head.row - tail.row, 2) + Math.pow(head.col - tail.col, 2)
  );
  if (distance >= 2) {
    if (head.row === tail.row) {
      if (head.col > tail.col) {
        tail.col++;
      } else {
        tail.col--;
      }
    } else if (head.col === tail.col) {
      if (head.row > tail.row) {
        tail.row++;
      } else {
        tail.row--;
      }
    } else {
      // Diag
      if (head.row === tail.row + 1 && head.col === tail.col + 2) {
        tail.col++;
        tail.row++;
      } else if (head.row === tail.row + 2 && head.col === tail.col + 1) {
        tail.col++;
        tail.row++;
      } else if (head.row === tail.row + 2 && head.col === tail.col - 1) {
        tail.col--;
        tail.row++;
      } else if (head.row === tail.row + 1 && head.col === tail.col - 2) {
        tail.col--;
        tail.row++;
      } else if (head.row === tail.row - 1 && head.col === tail.col - 2) {
        tail.col--;
        tail.row--;
      } else if (head.row === tail.row - 2 && head.col === tail.col - 1) {
        tail.col--;
        tail.row--;
      } else if (head.row === tail.row - 2 && head.col === tail.col + 1) {
        tail.col++;
        tail.row--;
      } else if (head.row === tail.row - 1 && head.col === tail.col + 2) {
        tail.col++;
        tail.row--;
      }
    }
  }

  if (!visited[tail.row]) {
    visited[tail.row] = {};
  }
  if (!visited[tail.row][tail.col]) {
    totalVisited++;
    visited[tail.row][tail.col] = true;
  }
}

function moveRight(distance: number) {
  for (let i = 0; i < distance; ++i) {
    head.col = head.col + 1;
    checkAndMoveTail();
  }
}

function moveLeft(distance: number) {
  for (let i = 0; i < distance; ++i) {
    head.col = head.col - 1;
    checkAndMoveTail();
  }
}

function moveDown(distance: number) {
  for (let i = 0; i < distance; ++i) {
    head.row = head.row + 1;
    checkAndMoveTail();
  }
}

function moveUp(distance: number) {
  for (let i = 0; i < distance; ++i) {
    head.row = head.row - 1;
    checkAndMoveTail();
  }
}

commands.forEach((command) => {
  const { direction, distance } = command;
  switch (direction) {
    case "R":
      moveRight(distance);
      break;
    case "L":
      moveLeft(distance);
      break;
    case "D":
      moveDown(distance);
      break;
    case "U":
      moveUp(distance);
      break;
  }
});

console.log({ totalVisited });

const rope = new Rope(10);
console.log(rope.toString(), rope.total);
rope.runScript(commands);
console.log(rope.toString(), rope.total);
