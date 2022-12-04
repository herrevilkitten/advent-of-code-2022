import * as fs from 'fs';

const data = fs.readFileSync('./day1.txt', 'utf8');
const lines = data.split(/\n/);

const stocks:number[] = [];

let currentElf = 0;
let maxElf = 0;
let maxStock = 0;
lines.forEach((line) => {
  if (line === '') {
    const currentStock = stocks[currentElf];
    if (currentStock > maxStock) {
      maxElf = currentElf;
      maxStock = currentStock;
    }
    currentElf++;
  }

  const value = Number(line);

  stocks[currentElf] = (stocks[currentElf] ?? 0) + value;
});
if (stocks[currentElf] > maxStock) {
  maxElf = currentElf;
  maxStock = stocks[currentElf];
}

console.log(currentElf);
console.log(maxElf, '=>', maxStock);

stocks.sort((a, b) => Number(b) - Number(a));
const top3 = stocks.slice(0, 3);
const sum = top3.reduce((prev, curr) => prev + curr, 0);
console.log(top3, '=>', sum);