const path = require('path');
const { readFileSync } = require('fs');

const maxTotalCalories = (calories) => {
    const elfCalories = calories
        .filter(x => !x.match(/^\r?\n$/))
        .map(x => x
            .split(/\r?\n/)
            .reduce((prev, current) => prev + parseInt(current), 0)
        )

    return Math.max(...elfCalories)
}

module.exports = logSolution = () => {

    const calories = readFileSync(path.join(__dirname, 'input.txt'))
        .toString()
        .split(/(\r?\n){2}/);

    console.log('Day 1: Calorie Counting')
    console.log('part 1 => ', maxTotalCalories(calories));
}