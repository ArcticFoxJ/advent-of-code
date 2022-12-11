import { readFileSync } from 'fs'
import { join }from 'path'

const transposeMatrix = <T>(matrix: T[][]) => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]))
}

const getCargoFromFile = (fileLines: string[], numbersRowIndex: number): string[][] => {
    let cargo: string[][] = []
    fileLines.splice(0, numbersRowIndex).forEach((line: string, i: number) => {
        let row: number = 0
        do {
            cargo[i] = cargo[i] || []
            cargo[i][row] = (line.slice(row*4, (row+1)*4).match(/[A-Z]/) || [])[0]
            row++
        }
        while (line.length > row*4)
    })

    return transposeMatrix(cargo).map(x => x.filter(y => y !== undefined))
}
const getInstructionsFromFile = (fileLines: string[], numbersRowIndex: number): number[][] => {
    const instructionsRegex: RegExp = /^move ([0-9]*?) from ([0-9]*?) to ([0-9]*?)$/
    return fileLines.splice(2, fileLines.length - 2).map(x => {
        const matches = x.match(instructionsRegex)
        return matches.splice(1, 3).map(x => parseInt(x))
    })
}

const getTopCrates = (fileLines: string[], canMoveMultiple: boolean = false): any => {

    const isNumbersReg: RegExp = /^[0-9\s]*$/
    let numbersRowIndex: number = fileLines.findIndex(x => isNumbersReg.test(x))
    
    const cargo: string[][] = getCargoFromFile(fileLines, numbersRowIndex)
    const instructions: number[][] = getInstructionsFromFile(fileLines, numbersRowIndex)
    

    instructions.forEach((instruction: number[]) => {
        const movingCargoCount: number = instruction[0]
        const col1: number = instruction[1] - 1
        const col2: number = instruction[2] - 1

        const movingCargo: string[] = [...Array(movingCargoCount)].map(x => cargo[col1].shift())

        canMoveMultiple
        ? movingCargo.reverse().forEach(x => cargo[col2].unshift(x))
        : movingCargo.forEach(x => cargo[col2].unshift(x))
    })

    return cargo.map(x => x[0]).join('')
}

export const logSolution = (): void => {

    const fileLines: string[] = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/\r?\n/)
        
    console.log('Day 5: Supply Stacks')
    console.log('\tpart 1 => ', getTopCrates(new Array(...fileLines)))
    console.log('\tpart 2 => ', getTopCrates(new Array(...fileLines), true))
}