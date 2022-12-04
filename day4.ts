import * as fs from "fs";

const data = fs.readFileSync("./day4.txt", "utf8");
const lines = data.split(/\n/);

let counter = 0;
lines.forEach((line) => {
  const [elf1, elf2] = line.split(",");
  const [min1, max1] = elf1.split("-").map(value => Number(value));
  const [min2, max2] = elf2.split("-").map(value => Number(value));

  if ((min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1)) {
    counter++;
  }
});

console.log("Overlaps:", counter);

counter = 0;
lines.forEach((line) => {
  const [elf1, elf2] = line.split(",");
  const [min1, max1] = elf1.split("-").map(value => Number(value));
  const [min2, max2] = elf2.split("-").map(value => Number(value));

  if ((min1 >= min2 && min1 <= max2) || (max1 >= min2 && max1 <= max2) || (min2 >= min1 && min2 <= max1) || (max2 >= min1 && max2 <= max1)) {
    counter++;
  }
});

console.log("More Overlaps:", counter);
