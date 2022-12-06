import { readFileSync } from 'fs'
import { join }from 'path'

const getExclusiveOverlapCount = (assignments: number[][][]): number => {
    return assignments
        .filter(a => {
            const first: number[] = a[0]
            const second: number[] = a[1]

            return (first[0] <= second[0] && first[1] >= second[1]) 
                || (second[0] <= first[0] && second[1] >= first[1])
        })
        .length;
}

const getAnyOverlapCount = (assignments: number[][][]): number => {
    return assignments
        .filter(a => {
            const first: number[] = a[0]
            const second: number[] = a[1]

            return (second[0] >= first[0] && second[0] <= first[1])
                || (first[0] >= second[0] && first[0] <= second[1])
        })
        .length;
}

export const logSolution = (): void => {

    const assignments: number[][][] = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/\r?\n/)
        .map(assignments => assignments.split(',')
            .map(sections => sections.split('-')
                .map(section => parseInt(section))))
        
    console.log('Day 4: Camp Cleanup')
    console.log('\tpart 1 => ', getExclusiveOverlapCount(assignments))
    console.log('\tpart 2 => ', getAnyOverlapCount(assignments))
}