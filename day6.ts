import * as fs from "fs";

const data = fs.readFileSync("./day6.txt", "utf8");
const lines = data.split(/\n/);

const signal = lines[0];

type Counter = { [name: string]: number };

const aCode = "a".charCodeAt(0);
const zCode = "z".charCodeAt(0);

function createLetterCounter() {
  let counter: Counter = {};
  for (let code = aCode; code <= zCode; ++code) {
    counter[String.fromCharCode(code)] = 0;
  }
  return counter;
}

function checkLetterCounter(counter: Counter) {
  return Object.values(counter).filter((value) => value > 1).length === 0;
}

function addLetter(counter: Counter, letter: string) {
  counter[letter] = counter[letter] + 1;
}

function removeLetter(counter: Counter, letter: string) {
  counter[letter] = counter[letter] - 1;
}

function findUniquePacket(size: number) {
  let letterCounter = createLetterCounter();
  signal
    .slice(0, size)
    .split("")
    .forEach((letter) => {
      addLetter(letterCounter, letter);
    });

  for (let index = size; index < signal.length; ++index) {
    addLetter(letterCounter, signal[index]);

    if (checkLetterCounter(letterCounter)) {
      console.log("Signal found at", index);
      return index;
    }

    removeLetter(letterCounter, signal[index - size]);
  }
}

findUniquePacket(4);
findUniquePacket(14);
