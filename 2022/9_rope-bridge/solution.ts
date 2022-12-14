import { Dir, readFileSync } from 'fs'
import { join }from 'path'

enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

class Position {
    private x: number
    private y: number
    private _visited: Set<string>

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this._visited = new Set<string>()
        this._visited.add(JSON.stringify([this.x, this.y]))
    }

    public get visitedCount(): number {
        return this._visited.size
    }

    move(directions: Direction[]) {

        directions.forEach(direction => {
            switch(direction) {
                case Direction.Up:
                    this.y++
                    break
                case Direction.Down:
                    this.y--
                    break
                case Direction.Left:
                    this.x--
                    break
                case Direction.Right:
                    this.x++
                    break
            }
        });

        this._visited.add(JSON.stringify([this.x, this.y]))
    }

    ensureTouching(position: Position): void {
        const yMoreThan1RowUp = position.y > this.y + 1
        const yMoreThan1RowDown = position.y < this.y - 1

        const xMoreThan1RowRight = position.x > this.x + 1
        const xMoreThan1RowLeft = position.x < this.x - 1

        let movements: Direction[] = []

        if(yMoreThan1RowUp) {
            movements.push(Direction.Up)
            if(position.x > this.x) {
                movements.push(Direction.Right)
            }
            else if(position.x < this.x) {
                movements.push(Direction.Left)
            }
        } else if (yMoreThan1RowDown) {
            movements.push(Direction.Down)
            if(position.x > this.x) {
                movements.push(Direction.Right)
            }
            else if(position.x < this.x) {
                movements.push(Direction.Left)
            }
        } else if(xMoreThan1RowRight){
            movements.push(Direction.Right)
            if(position.y > this.y) {
                movements.push(Direction.Up)
            }
            else if(position.y < this.y) {
                movements.push(Direction.Down)
            }
        } else if (xMoreThan1RowLeft) {
            movements.push(Direction.Left)
            if(position.y > this.y) {
                movements.push(Direction.Up)
            }
            else if(position.y < this.y) {
                movements.push(Direction.Down)
            }
        }

        this.move(movements)
    }
}

const positionsTailVisited = (headMovement: string[]): number => {
    let head: Position = new Position(0,0)
    let tail: Position = new Position(0,0)

    headMovement.forEach((movement: string) => {
        const stringParts = movement.split(' ')

        const direction: Direction = stringParts[0] as Direction
        const count: number = parseInt(stringParts[1])

        for(let i=0; i<count; i++) {
            head.move([direction])
            tail.ensureTouching(head)
        }
    })

    return tail.visitedCount
}

const positionsKnotVisited = (headMovement: string[]): number => {
    let head: Position = new Position(0,0)
    let knot1: Position = new Position(0,0)
    let knot2: Position = new Position(0,0)
    let knot3: Position = new Position(0,0)
    let knot4: Position = new Position(0,0)
    let knot5: Position = new Position(0,0)
    let knot6: Position = new Position(0,0)
    let knot7: Position = new Position(0,0)
    let knot8: Position = new Position(0,0)
    let knot9: Position = new Position(0,0)

    headMovement.forEach((movement: string) => {
        const stringParts = movement.split(' ')

        const direction: Direction = stringParts[0] as Direction
        const count: number = parseInt(stringParts[1])

        for(let i=0; i<count; i++) {
            head.move([direction])
            knot1.ensureTouching(head)
            knot2.ensureTouching(knot1)
            knot3.ensureTouching(knot2)
            knot4.ensureTouching(knot3)
            knot5.ensureTouching(knot4)
            knot6.ensureTouching(knot5)
            knot7.ensureTouching(knot6)
            knot8.ensureTouching(knot7)
            knot9.ensureTouching(knot8)
        }
    })

    return knot9.visitedCount
}

export const logSolution = (): void => {

    const headMovement: string[] = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/\r?\n/)
        
    console.log('Day 6: Tuning Trouble')
    console.log('\tpart 1 => ', positionsTailVisited(headMovement)) //5710
    console.log('\tpart 2 => ', positionsKnotVisited(headMovement)) //2259
}