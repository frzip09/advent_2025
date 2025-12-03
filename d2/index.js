const fs = require("fs");

function chunkString(str, size) {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.substring(i, i + size));
  }
  return chunks;
}

function* factors(input) {
  const limit = Math.floor(Math.sqrt(input));
  for (let i = 1; i <= limit; i++) {
    if (input % i === 0) {
      yield i;
      const complementPair = input / i;
      if (complementPair !== i) {
        yield complementPair;
      }
    }
  }
}

function testRepeatedNumbersPart2(input) {
  const strInput = String(input);
  for (const factor of factors(strInput.length)) {
    if (factor === strInput.length) {
      continue;
    }
    const chunks = chunkString(strInput, factor);
    const allEqual = chunks.every((chunk) => chunk === chunks[0]);
    if (allEqual) {
      return true;
    }
  }
  return false;
}

function testRepeatedNumbersPart1(input) {
  const strInput = String(input);
  if (strInput.length % 2 !== 0) {
    return false;
  }
  const midIdx = strInput.length / 2;
  const l = strInput.substring(0, midIdx);
  const r = strInput.substring(midIdx);
  return l === r;
}

function* inclusiveRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function processIdRange(idRange, testFn) {
  const [start, end] = idRange.split("-").map((v) => parseInt(v, 10));
  let sum = 0;
  for (const id of inclusiveRange(start, end)) {
    if (testFn(id)) {
      sum += id;
    }
  }
  return sum;
}

function solutionPart1(idRanges) {
  return idRanges
    .map((idRange) => processIdRange(idRange, testRepeatedNumbersPart1))
    .reduce((prev, cur) => prev + cur, 0);
}

function solutionPart2(idRanges) {
  return idRanges
    .map((idRange) => processIdRange(idRange, testRepeatedNumbersPart2))
    .reduce((prev, cur) => prev + cur, 0);
}

(() => {
  const input = fs.readFileSync("d2/input.txt", "utf-8").trim().split(",");
  const sol1 = solutionPart1(input);
  console.log(`\n solution part 1: ${sol1}\n`);

  const sol2 = solutionPart2(input);
  console.log(`\n solution part 2: ${sol2}\n`);
})();
