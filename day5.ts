import * as fs from "fs";

const data = fs.readFileSync("./day5.txt", "utf8");
const lines = data.split(/\n/);

let stacks: Array<Array<string>> = [[], [], [], [], [], [], [], [], []];

// Load the stacks
let index = 0;
for (; index < lines.length; ++index) {
  const line = lines[index];
  if (line === "") {
    break;
  }

  for (let letters = 0; letters < line.length; letters = letters + 4) {
    const letter = line[letters + 1];
    if (letter.match(/[0-9]/)) {
      break;
    } else if (letter.match(/[A-Z]/)) {
      const stack = letters / 4;
      stacks[stack].unshift(letter);
    }
  }
}
console.log(stacks);

// Run the commands
index = index + 1;
for (; index < lines.length; ++index) {
  const line = lines[index];
  if (line === "") {
    break;
  }
  const matches = line.match(/move (\d+) from (\d+) to (\d+)/);
  if (matches) {
    const [, count, from, to] = matches.map((v) => Number(v));
    for (let moving = 0; moving < count; ++moving) {
      const value = stacks[from - 1].pop();
      if (value) {
        stacks[to - 1].push(value);
      }
    }
  }
}

console.log(stacks);
for (let stack = 0; stack < stacks.length; stack++) {  
  console.log(stack, '=>', stacks[stack][stacks[stack].length - 1]);
}
let output = stacks.map(stack => stack[stack.length - 1]);
console.log(output.join(''));

// Part 2
stacks = [[], [], [], [], [], [], [], [], []];

// Load the stacks
index = 0;
for (; index < lines.length; ++index) {
  const line = lines[index];
  if (line === "") {
    break;
  }

  for (let letters = 0; letters < line.length; letters = letters + 4) {
    const letter = line[letters + 1];
    if (letter.match(/[0-9]/)) {
      break;
    } else if (letter.match(/[A-Z]/)) {
      const stack = letters / 4;
      console.log(stack, letter);
      stacks[stack].unshift(letter);
    }
  }
}
console.log(stacks);

// Run the commands
index = index + 1;
for (; index < lines.length; ++index) {
  const line = lines[index];
  if (line === "") {
    break;
  }
  console.log(line);
  const matches = line.match(/move (\d+) from (\d+) to (\d+)/);
  if (matches) {
    const [, count, from, to] = matches.map((v) => Number(v));
    console.log({ count, from, to });
    let movingStack = [];
    for (let moving = 0; moving < count; ++moving) {
      const value = stacks[from - 1].pop();
      if (value) {
        movingStack.unshift(value);
      }
    }
    stacks[to - 1] = stacks[to - 1].concat(...movingStack);
  }
}

console.log(stacks);
for (let stack = 0; stack < stacks.length; stack++) {  
  console.log(stack, '=>', stacks[stack][stacks[stack].length - 1]);
}
output = stacks.map(stack => stack[stack.length - 1]);
console.log(output.join(''));
