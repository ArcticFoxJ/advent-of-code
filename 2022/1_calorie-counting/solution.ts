import { readFileSync } from 'fs'
import { join }from 'path'

const maxTotalCalories = (calories) => {
    return Math.max(...calories)
}

const maxThreeTotalCalories = (calories) => {
    return calories
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((prev, current) => prev + parseInt(current), 0)
}

export const logSolution = () => {

    const calories = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/(\r?\n){2}/)
        .filter(x => !x.match(/^\r?\n$/))
        .map(x => x
            .split(/\r?\n/)
            .reduce((prev, current) => prev + parseInt(current), 0)
        )

    console.log('Day 1: Calorie Counting')
    console.log('part 1 => ', maxTotalCalories(calories))
    console.log('part 2 => ', maxThreeTotalCalories(calories))
}