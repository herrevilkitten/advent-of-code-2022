import * as fs from "fs";

const data = fs.readFileSync("./day7.txt", "utf8");
const lines = data.split(/\n/);

class File {
  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
  name = "";
  size = 0;
}

class Directory {
  constructor(name: string) {
    this.name = name;
  }

  name = "";
  contents: { [name: string]: Directory | File } = {};

  add(content: File | Directory) {
    this.contents[content.name] = content;
  }

  get(name: string) {
    return this.contents[name];
  }

  get size(): number {
    return Object.values(this.contents).reduce(
      (prev, curr) => prev + curr.size,
      0
    );
  }
}

class Stack {
  path: Directory[] = [];

  constructor(root: Directory) {
    this.path.push(root);
  }

  get top() {
    return this.path[this.path.length - 1];
  }

  push(directory: Directory) {
    this.path.push(directory);
  }

  pop() {
    return this.path.pop();
  }
}

const root = new Directory("/");
const stack = new Stack(root);

for (let index = 0; index < lines.length; ++index) {
  const line = lines[index];

  if (line.startsWith("$")) {
    let match = line.match(/\$ cd (.+)/);
    if (match) {
      if (match[1] === "..") {
        console.log("> Up");
        stack.pop();
      } else {
        console.log("> in", match[1]);
        let directory = stack.top.contents[match[1]];
        if (!directory) {
          directory = new Directory(match[1]);
        }
        if (directory instanceof File) {
          continue;
        }
        stack.top.add(directory);
        stack.push(directory);
      }
    }
  } else {
    let match = line.match(/(\d+) (.+)/);
    if (match) {
      const file = new File(match[2], Number(match[1]));
      stack.top.add(file);
    }
  }
}

console.log(root);
console.log(root.size);

function traverseNode(directory: Directory) {
  let sum = 0;
  Object.values(directory.contents).forEach((dir) => {
    if (dir instanceof Directory) {
      if (dir.size < 100000) {
        console.log(`${dir.name}: ${dir.size}`);
        sum = sum + dir.size;
      }
      sum = sum + traverseNode(dir);
    }
  });
  return sum;
}

const sum = traverseNode(root);
console.log(sum);

const TOTAL_SIZE = 70000000;
const UPDATE_SIZE = 30000000;
const UNUSED_SPACE = TOTAL_SIZE - root.size;
const NEEDED_SPACE = UPDATE_SIZE - UNUSED_SPACE;

console.log({ TOTAL_SIZE, UPDATE_SIZE, UNUSED_SPACE, NEEDED_SPACE });

function traverseNode2(directory: Directory) {
  let choices: Directory[] = [];
  //console.log(directory.name, directory.size);
  Object.values(directory.contents).forEach((dir) => {
    if (dir instanceof Directory) {
      if (dir.size >= NEEDED_SPACE) {
        //      console.log(`${dir.name}: ${dir.size}`);
        choices.push(dir);
      }
      choices = choices.concat(...traverseNode2(dir));
    }
  });
  return choices;
}

const choices = traverseNode2(root);
choices.sort((a, b) => Number(a.size) - Number(b.size));
console.log(choices.map((dir) => `${dir.name}: ${dir.size}`));
