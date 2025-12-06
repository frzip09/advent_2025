const fs = require('fs');

function findIndexLargestDigit(digits) {
    let idxLargest = 0;
    let largest = '0';
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] === '9') {
            return i;
        }
        if (digits[i] > largest) {
            largest = digits[i];
            idxLargest = i;
        }
    }
    return idxLargest;
}

function findMaxNumberInDigits(digits, size) {
    let result = '';
    let startIdx = 0;

    // keep going until we have the num of digits we need
    while (result.length < size) {
        const remainingDigs = size - result.length;
        // ensure there are enough digits to finish filling out the result
        const endIdx = digits.length - remainingDigs;

        let idxLargest = startIdx;
        let largest = '0';

        for (let i = startIdx; i <= endIdx; i++) {
            if (digits[i] > largest) {
                largest = digits[i];
                idxLargest = i;

                if (largest === '9') {
                    break;
                }
            }
        }

        result += largest;
        // next iteration start at idx of the largest val from this iteration
        startIdx = idxLargest + 1;
    }

    return Number(result);
}

function solutionPart1(input) {
    let sum = 0;
    for (digits of input) {
        const idxLargest = findIndexLargestDigit(digits.substring(0, digits.length - 1));
        const idx2ndLargest = findIndexLargestDigit(digits.substring(idxLargest + 1)) + idxLargest + 1;
        const val = digits[idxLargest] + digits[idx2ndLargest];
        sum += Number(val);
    }
    return sum;
}

function solutionPart2(input) {
    let sum = 0;
    for (row of input) {
        sum += findMaxNumberInDigits(row, 12);
    }
    return sum;
}

(() => {
      const input = fs.readFileSync("d3/input.txt", "utf-8").trim().split("\n");
      const sol1 = solutionPart1(input);
      console.log(`\n solution part 1: ${sol1}\n`);

      const sol2 = solutionPart2(input);
      console.log(`\n solution part 2: ${sol2}\n`);
})();
