import { readFileSync } from 'fs'
import { join }from 'path'

class DirectorySize {
    directory: string
    size: number

    constructor(directory: string) {
        this.directory = directory;
        this.size = 0;
    }

    addFileSize(size: number) {
        this.size += size
    }
}

const getDirectoryTotalSizes = (lines: string[]): DirectorySize[] => {
    let traversing: DirectorySize[] = []
    let totals: DirectorySize[] = []

    for(let i=0; i<lines.length; i++){
        const currentLine = lines[i]
        if(currentLine.startsWith('$ cd')) {
            if(currentLine.endsWith('..')) {
                totals.push(traversing.pop())
            } else {
                traversing.push(new DirectorySize(currentLine.replace('$ cd ', '')))
            }
        }
        if(currentLine.startsWith('$ ls')) {
            let index = i + 1
            while (index < lines.length && !lines[index].startsWith('$')) {
                const nextLine = lines[index]
                if (!nextLine.startsWith('dir')) {
                    traversing.forEach(x => x.addFileSize(parseInt(nextLine.replace( /\D/g, ''))))
                }
                index++
                i++
            } 
        }
    }

    while (traversing.length) {
        totals.push(traversing.pop())
    }

    return totals
}

const totalSize = (lines: string[]): number => {
    const totals = getDirectoryTotalSizes(lines)
    return totals.reduce(
        (sum, currentValue) => currentValue.size <= 100000 ? sum + currentValue.size : sum,
        0
      );
}

const smallestSizeToDelete = (lines: string[]): number => {
    const totals = getDirectoryTotalSizes(lines)

    const usedSpace: number = totals.find(x => x.directory === '/').size;
    const freeSpace = 70000000 - usedSpace
    const requiredSpace = 30000000 - freeSpace

    let currentResult: number = usedSpace

    totals.forEach(x => {
        currentResult = x.size < currentResult && x.size > requiredSpace ? x.size : currentResult
    })

    return currentResult
}

export const logSolution = (): void => {

    const lines: string[] = readFileSync(join(__dirname, 'input.txt'))
    .toString()
    .split(/\r?\n/)
        
    console.log('Day 7: No Space Left On Device')
    console.log('\tpart 1 => ', totalSize(lines))
    console.log('\tpart 2 => ', smallestSizeToDelete(lines))
}