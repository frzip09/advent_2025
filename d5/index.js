const fs = require('fs');

function getRangesAndAvailableIds(input) {
  const ranges = [];
  const availableIds = [];
  let isRange = true;
  for (let row of input) {
    if (row === "") {
      isRange = false;
      continue;
    }
    if (isRange) {
      ranges.push(row);
    } else {
      availableIds.push(row);
    }
  }
  return [ranges, availableIds];
}

function solutionPart1(input) {
  const [ranges, availableIds] = getRangesAndAvailableIds(input);

  const freshItems = [];
  for (let id of availableIds) {
    const numId = Number(id);
    for (let range of ranges) {
      const [min, max] = range.split('-').map(Number);
      if (numId >= min && numId <= max) {
        freshItems.push(id);
        break;
      }
    }
  }
  
  return freshItems.length;
}

function solutionPart2(input) {
  const [ranges] = getRangesAndAvailableIds(input);

}

(() => {
  const input = fs.readFileSync("d5/sample_input.txt", "utf-8").trim().split("\n");

  const sol1 = solutionPart1(input);
  console.log(`\n solution part 1: ${sol1}\n`);

  const sol2 = solutionPart2(input, 0);
  console.log(`\n solution part 2: ${sol2}\n`);
})();
