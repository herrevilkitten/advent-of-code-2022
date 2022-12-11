import * as fs from "fs";

const data = fs.readFileSync("./day10.txt", "utf8");
const lines = data.split(/\n/);

type NoOp = { type: "noop" };
type AddxOp = { type: "addx"; register: "x"; value: number };
type Operation = NoOp | AddxOp;

const registers = {
  x: 1,
};

const timeline: Operation[][] = [];

let pointer = 0;
for (let index = 0; index < lines.length; ++index) {
  const line = lines[index];
  const [command, value] = line.split(" ");
  let operation: Operation | undefined;
  let place: number | undefined;
  switch (command) {
    case "noop":
      operation = { type: "noop" };
      place = pointer;
      break;
    case "addx":
      operation = { type: "addx", register: "x", value: Number(value) };
      place = pointer + 1;
      break;
  }

  if (place !== undefined && operation !== undefined) {
    if (!timeline[place]) {
      timeline[place] = [];
    }
    timeline[place].push(operation);
    switch (operation.type) {
      case "noop":
        pointer = pointer + 1;
        break;
      case "addx":
        pointer = pointer + 2;
        break;
    }
  }
}

console.log(pointer);

const SIGNALS = [20, 60, 100, 140, 180, 220];

const values: number[] = [];
for (let index = 0; index < pointer; ++index) {
  console.log(index, timeline[index], registers.x);
  let entries = timeline[index];
  if (!entries) {
    entries = [];
  }

  if (SIGNALS.indexOf(index + 1) >= 0) {
    values.push(registers.x * (index + 1));
    console.log(`#${index + 1}: ${registers.x * (index + 1)}`);
  }

  entries.forEach((entry) => {
    if (entry.type === "addx") {
      registers[entry.register] += entry.value;
    }
  });
}

console.log(registers);
console.log(
  values,
  values.reduce((prev, curr) => prev + curr, 0)
);

let row = 0;
let column = 1;
let output = "";
registers.x = 1;
for (let index = 0; index < pointer; ++index) {
  let entries = timeline[index];
  if (!entries) {
    entries = [];
  }

  entries.forEach((entry) => {
    if (entry.type === "addx") {
      registers[entry.register] += entry.value;
    }
  });

//  console.log(column, registers.x - 1, registers.x + 1, column >= registers.x - 1 && column <= registers.x + 1);
  if (column >= registers.x - 1 && column <= registers.x + 1) {
    output = output + "#";
  } else {
    output = output + ".";
  }

  column = column + 1;
  if (column === 41) {
    console.log(output);
    output = "";
    column = 1;
    row = row + 1;
  }
}
