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

const totalSize = (lines: string[]): number => {
    let traversing: DirectorySize[] = []
    let totals: number[] = []

    for(let i=0; i<lines.length; i++){
        if(lines[i].startsWith('$ cd')) {
            if(lines[i].endsWith('..')) {
                totals.push(traversing.pop().size)
            } else {
                const dir = lines[i].replace('$ cd ', '')
                traversing.push(new DirectorySize(dir))
            }
        }
        if(lines[i].startsWith('$ ls')) {
            let index = i + 1
            do {
                if(!lines[index].startsWith('dir')){
                    const size = parseInt(lines[index].replace( /\D/g, ''))
                    traversing.forEach(x => x.addFileSize(size))
                }
                if(index == lines.length-1) {
                    break
                }
                index++
                i++
            } while(!lines[index].startsWith('$'))
        }
    }

    while (traversing.length) {
        totals.push(traversing.pop().size)
    }
    
    return totals.reduce(
        (sum, currentValue) => currentValue <= 100000 ? sum + currentValue : sum,
        0
      );
}

const smallestSizeToDelete = (lines: string[]): number => {
    let traversing: DirectorySize[] = []
    let totals: DirectorySize[] = []

    for(let i=0; i<lines.length; i++){
        if(lines[i].startsWith('$ cd')) {
            if(lines[i].endsWith('..')) {
                totals.push(traversing.pop())
            } else {
                const dir = lines[i].replace('$ cd ', '')
                traversing.push(new DirectorySize(dir))
            }
        }
        if(lines[i].startsWith('$ ls')) {
            let index = i + 1
            do {
                if(!lines[index].startsWith('dir')){
                    const size = parseInt(lines[index].replace( /\D/g, ''))
                    traversing.forEach(x => x.addFileSize(size))
                }
                if(index == lines.length-1) {
                    break
                }
                index++
                i++
            } while(!lines[index].startsWith('$'))
        }
    }

    while (traversing.length) {
        totals.push(traversing.pop())
    }

    const usedSpace: number = totals.find(x => x.directory === '/').size;
    const freeSpace = 70000000 - usedSpace
    const requiredSpace = 30000000 - freeSpace

    const sizes: number[] = totals.map(x => x.size)
    let currentResult: number = usedSpace

    sizes.forEach(x => {
        if(x < currentResult) {
            currentResult = x > requiredSpace ? x : currentResult
        }
    })

    return currentResult
}

export const logSolution = (): void => {

    const lines: string[] = readFileSync(join(__dirname, 'input.txt'))
    .toString()
    .split(/\r?\n/)
        
    console.log('Day 7: No Space Left On Device')
    console.log('\tpart 1 => ', totalSize(lines)) // test=95437   input=1778099
    console.log('\tpart 2 => ', smallestSizeToDelete(lines)) // test=24933642   input=
}