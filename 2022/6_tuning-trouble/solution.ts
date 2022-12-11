import { readFileSync } from 'fs'
import { join }from 'path'

const getStartOfMarker = (text: string, uniqueCharacters: number): number => {
    let position = 0
    while(position < text.length - uniqueCharacters - 1) {
        const characters: string[] = text.slice(position, position + uniqueCharacters).split('')
        if(characters.length === new Set(characters).size) {
            return position + uniqueCharacters
        }
        position++
    }
}

export const logSolution = (): void => {

    const text: string = readFileSync(join(__dirname, 'input.txt')).toString()
        
    console.log('Day 6: Tuning Trouble')
    console.log('\tpart 1 => ', getStartOfMarker(text, 4))
    console.log('\tpart 2 => ', getStartOfMarker(text, 14))
}