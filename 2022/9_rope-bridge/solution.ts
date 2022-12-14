import { Dir, readFileSync } from 'fs'
import { join }from 'path'

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

        console.log([this.x, this.y])

        this._visited.add(JSON.stringify([this.x, this.y]))
    }

    ensureTouching(position: Position): void {
        if(position.x === this.x 
            && position.y > this.y + 1) {
                this.move([Direction.Up])
        }
        else if(position.x === this.x 
            && position.y < this.y - 1) {
                this.move([Direction.Down])
        }
        else if(position.y === this.y 
            && position.x > this.x + 1) {
                this.move([Direction.Right])
        }
        else if(position.y === this.y 
            && position.x < this.x - 1) {
                this.move([Direction.Left])
        }
        else {
            if(position.y > this.y + 1) {
                if(position.x > this.x) {
                    this.move([Direction.Up, Direction.Right])
                }
                else if(position.x < this.x) {
                    this.move([Direction.Up, Direction.Left])
                }
            }
            else if(position.y < this.y - 1) {

                if(position.x > this.x) {
                    this.move([Direction.Down, Direction.Right])
                }
                else if(position.x < this.x) {
                    this.move([Direction.Down, Direction.Left])
                }
            }
            else if(position.x > this.x + 1) {
                if(position.y > this.y) {
                    this.move([Direction.Right, Direction.Up])
                }
                else if(position.y < this.y) {
                    this.move([Direction.Right, Direction.Down])
                }
            }
            else if(position.x < this.x - 1) {
                if(position.y > this.y) {
                    this.move([Direction.Left, Direction.Up])
                }
                else if(position.y < this.y) {
                    this.move([Direction.Left, Direction.Down])
                }

            }
        }
    }
}

enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

const positionsVisited = (headMovement: string[]): number => {
    let head: Position = new Position(0,0)
    let tail: Position = new Position(0,0)

    let visited = new Set<string>()

    headMovement.forEach((movement: string) => {
        const stringParts = movement.split(' ')

        const direction: Direction = stringParts[0] as Direction
        const count: number = parseInt(stringParts[1])

        for(let i=0; i<count; i++) {
            console.log('head')
            head.move([direction])
            console.log('tail')
            tail.ensureTouching(head)
        }
    })

    return tail.visitedCount
}

export const logSolution = (): void => {

    const headMovement: string[] = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/\r?\n/)
        
    console.log('Day 6: Tuning Trouble')
    console.log('\tpart 1 => ', positionsVisited(headMovement)) //test=13  input=5710
}