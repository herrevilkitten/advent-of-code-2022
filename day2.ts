import * as fs from "fs";

const data = fs.readFileSync("./day2.txt", "utf8");
const lines = data.split(/\n/);

const SHAPES = {
  X: 1,
  Y: 2,
  Z: 3,
};

const SCORES = {
  AX: 3,
  AY: 6,
  AZ: 0,
  BX: 0,
  BY: 3,
  BZ: 6,
  CX: 6,
  CY: 0,
  CZ: 3,
};

const MATCHES = {
  AX: 'Z',
  AY: 'X',
  AZ: 'Y',
  BX: 'X',
  BY: 'Y',
  BZ: 'Z',
  CX: 'Y',
  CY: 'Z',
  CZ: 'X',
}

let score = 0;
lines.forEach((line) => {
  const [opp, self] = line.split(/\s+/);
  score =
    score +
    SHAPES[self as keyof typeof SHAPES] +
    SCORES[`${opp}${self}` as keyof typeof SCORES];
});

console.log("Score:", score);

score = 0;
lines.forEach((line) => {
  const [opp, self] = line.split(/\s+/);
  const move = MATCHES[`${opp}${self}` as keyof typeof MATCHES];
  console.log(opp, self, move);
  score =
    score +
    SHAPES[move as keyof typeof SHAPES] +
    SCORES[`${opp}${move}` as keyof typeof SCORES];
});

console.log("Score:", score);
