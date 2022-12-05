import { readFileSync } from 'fs'
import { join }from 'path'

const priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const getItemPriority = (backpackItems: string[]) => {
    let itemPriority: number = 0

    backpackItems.forEach(itemList => {
        const count: number = itemList.length
        const compartment1: Set<string> = new Set(itemList.slice(0, count/2)) 
        const compartment2: Set<string> = new Set(itemList.slice(count/2, count))

        compartment1.forEach(x => {if(compartment2.has(x)){itemPriority += (priorities.indexOf(x) + 1)}})
    })

    return itemPriority
}

const getBadgePriority = (backpackItems: string[]) => {
    let badgePriority: number = 0

    for(let i = 0; i < backpackItems.length/3; i++) {
        const groupItems = backpackItems.slice(i*3, (i*3)+3)

        const elf1: string[] = Array.from(groupItems[0])
        const elf2: string[] = Array.from(groupItems[1])
        const elf3: string[] = Array.from(groupItems[2])

        const filteredArray = elf1
            .filter(value => elf2.includes(value))
            .filter(value => elf3.includes(value))
            badgePriority += (priorities.indexOf(filteredArray[0]) + 1)
    }
    
    return badgePriority
}

export const logSolution = (): void => {

    const backpackItems: string[] = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/\r?\n/)
        
    console.log('Day 3: Rucksack Reorganization')
    console.log('\tpart 1 => ', getItemPriority(backpackItems))
    console.log('\tpart 2 => ', getBadgePriority(backpackItems))
}