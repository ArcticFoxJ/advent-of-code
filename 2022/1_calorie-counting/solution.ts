import { readFileSync } from 'fs'
import { join }from 'path'

const maxTotalCalories = (calories: number[]): number => {
    return Math.max(...calories)
}

const maxThreeTotalCaloriesTotal = (calories: number[]): number => {
    return calories
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((prev: number, current: number) => prev + current, 0)
}

export const logSolution = () => {

    const elfCalorieTotals: number[] = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/(\r?\n){2}/)
        .filter(x => !x.match(/^\r?\n$/))
        .map(x => x
            .split(/\r?\n/)
            .reduce((prev: number, current: string) => prev + parseInt(current), 0)
        )

    console.log('Day 1: Calorie Counting')
    console.log('\tpart 1 => ', maxTotalCalories(elfCalorieTotals))
    console.log('\tpart 2 => ', maxThreeTotalCaloriesTotal(elfCalorieTotals))
}