import * as fs from "fs";

const data = fs.readFileSync("./day3.txt", "utf8");
const lines = data.split(/\n/);

function getIntersection(setA: Set<string>, setB: Set<string>) {
  const intersection = new Set(
    [...setA].filter((element) => setB.has(element))
  );

  return intersection;
}

function calculatePriority(intersections: string[]) {
  const FIRST_LOWER = "a".charCodeAt(0);
  const FIRST_UPPER = "A".charCodeAt(0);

  let priority = 0;
  intersections.forEach((letter) => {
    const charCode = letter.charCodeAt(0);
    if (letter.match(/[A-Z]/)) {
      priority = priority + (charCode - FIRST_UPPER) + 27;
    } else {
      priority = priority + (charCode - FIRST_LOWER) + 1;
    }
  });
  return priority;
}

const intersections: string[] = [];
lines.forEach((line) => {
  const middle = line.length / 2;
  const first = new Set<string>(line.slice(0, middle).split(""));
  const second = new Set<string>(line.slice(middle).split(""));
  intersections.push([...getIntersection(first, second)][0]);
});

console.log("Priority", calculatePriority(intersections));

intersections.length = 0;
for (let index = 0; index < lines.length; index += 3) {
  const first = new Set<string>(lines[index]);
  const second = new Set<string>(lines[index + 1]);
  const third = new Set<string>(lines[index + 2]);

  const firstIntersection = getIntersection(first, second);
  const secondIntersection = getIntersection(firstIntersection, third);
  intersections.push([...secondIntersection][0]);
}

console.log("Priority", calculatePriority(intersections));
