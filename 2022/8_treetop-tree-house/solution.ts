import { readFileSync } from 'fs'
import { join }from 'path'

interface ITreeVisibility {
    visible: boolean
    viewableTrees: number
}

class TreeMap {
    heights: number[][]
    lineLength: number

    constructor(heights: number[][]){
        this.heights = heights
        this.lineLength = heights.length
    }

    scenicScore(x: number, y: number): number {
        return this.treeVisibleFromLeft(x, y).viewableTrees
            * this.treeVisibleFromRight(x, y).viewableTrees
            * this.treeVisibleFromTop(x, y).viewableTrees
            * this.treeVisibleFromBottom(x, y).viewableTrees
    }

    treeIsVisible(x: number, y: number): boolean {
        return this.treeVisibleFromLeft(x, y).visible
            || this.treeVisibleFromRight(x, y).visible
            || this.treeVisibleFromTop(x, y).visible
            || this.treeVisibleFromBottom(x, y).visible
    }

    private treeVisibleFromLeft (x: number, y: number): ITreeVisibility {
        const height = this.heights[x][y]
        let visible: boolean = true
        let viewableTrees: number = 0
        let compareIndex = y
        let compareHeight: number

        if(y === 0) {
            return {visible: visible, viewableTrees: 0}
        }

        do {
            viewableTrees++
            compareIndex--
            compareHeight = this.heights[x][compareIndex]
            if(compareHeight >= height) {
                visible = false
            }
        } while(visible && compareIndex > 0)
        return {visible: visible, viewableTrees: viewableTrees}
    }

    private treeVisibleFromRight (x: number, y: number): ITreeVisibility {
        const height = this.heights[x][y]
        let visible: boolean = true
        let viewableTrees: number = 0
        let compareIndex = y
        let compareHeight: number

        if(y === this.lineLength - 1) {
            return {visible: visible, viewableTrees: 0}
        }

        do {
            viewableTrees++
            compareIndex++
            compareHeight = this.heights[x][compareIndex]
            if(compareHeight >= height) {
                visible = false
            }
        } while (visible && compareIndex < this.lineLength - 1)
        return {visible: visible, viewableTrees: viewableTrees}
    }

    private treeVisibleFromTop (x: number, y: number): ITreeVisibility {
        const height = this.heights[x][y]
        let visible: boolean = true
        let viewableTrees: number = 0
        let compareIndex = x
        let compareHeight: number

        if(x === 0) {
            return {visible: visible, viewableTrees: 0}
        }

        do {
            viewableTrees++
            compareIndex--
            compareHeight = this.heights[compareIndex][y]
            if(compareHeight >= height) {
                visible = false
            }
        } while(visible && compareIndex > 0)
        return {visible: visible, viewableTrees: viewableTrees}
    }

    private treeVisibleFromBottom (x: number, y: number): ITreeVisibility {
        const height = this.heights[x][y]
        let visible: boolean = true
        let viewableTrees: number = 0
        let compareIndex = x
        let compareHeight: number

        if(x === this.lineLength - 1) {
            return {visible: visible, viewableTrees: 0}
        }

        do {
            viewableTrees++
            compareIndex++
            compareHeight = this.heights[compareIndex][y]
            if(compareHeight >= height) {
                visible = false
            }
        } while (visible && compareIndex < this.lineLength - 1)
        return {visible: visible, viewableTrees: viewableTrees}
    }
}

export const visibleTreeCount = (heights: number[][]): number => {
    let visibleTreesCount: number = 0;
    const map: TreeMap = new TreeMap(heights)

    for (let x = 0; x < map.lineLength; x++) {
        for (let y = 0; y < map.lineLength; y++) {
            if(map.treeIsVisible(x, y)) {
                visibleTreesCount++
            }
        }
    }

    return visibleTreesCount
}

export const highestScore = (heights: number[][]): number => {
    let highestScore: number = 0;
    const map: TreeMap = new TreeMap(heights)

    for (let x = 0; x < map.lineLength; x++) {
        for (let y = 0; y < map.lineLength; y++) {
            const score = map.scenicScore(x, y)
            if (score > highestScore) {
                highestScore = score
            }
        }
    }

    return highestScore
}

export const logSolution = (): void => {

    const heights: number[][] = readFileSync(join(__dirname, 'input.txt'))
    .toString()
    .split(/\r?\n/)
    .map(line => line.split('').map(x => parseInt(x)))
        
    console.log('Day 8: Treetop Tree House')
    console.log('\tpart 1 => ', visibleTreeCount(heights)) //test=21 input=1789
    console.log('\tpart 2 => ', highestScore(heights)) //test=8 input=314820
}