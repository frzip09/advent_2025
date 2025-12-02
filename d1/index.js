const fs = require('fs');

function solutionPart1(input) {
    let position = 50;
    let zeroes = 0;

    for (const line of input) {
        const absoluteChange = parseInt(line.substring(1), 10);
        const multiplier = line[0] === 'L' ? -1 : 1;

        for (let i = 0; i < absoluteChange; i++) {
            position += multiplier;
            if (position === -1) {
                position = 99;
            } else if (position === 100) {
                position = 0;
            }
            
        }

        if (position === 0) {
            zeroes++;
        }
    }

    return zeroes;
}

function solutionPart2(input) {
    let position = 50;
    let zeroes = 0;

    for (const line of input) {
        const absoluteChange = parseInt(line.substring(1), 10);
        const multiplier = line[0] === 'L' ? -1 : 1;

        for (let i = 0; i < absoluteChange; i++) {
            position += multiplier;
            if (position === -1) {
                position = 99;
            } else if (position === 100) {
                position = 0;
            }
            if (position === 0) {
                zeroes++;
            }
        }
    }
    return zeroes;
}

(() => {
    const input = fs.readFileSync('d1/input.txt', 'utf-8').trim().split('\n');
    const password1 = solutionPart1(input);
    console.log(`part 1 password: ${password1}`);

    const password2 = solutionPart2(input);
    console.log(`part 2 password: ${password2}`);
})();