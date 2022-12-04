import { readFileSync } from 'fs'
import { join }from 'path'

enum shape {
    rock = 1,
    paper = 2,
    scissors = 3
}

enum outcome {
    loss = 0,
    win = 6,
    draw = 3
}

interface moveCombination {
    opponentMove: shape
    selectedMove: shape
    result: outcome
}

const outcomes: moveCombination[] = [
    {opponentMove: shape.rock, selectedMove: shape.rock, result: outcome.draw}, 
    {opponentMove: shape.rock, selectedMove: shape.paper, result: outcome.win}, 
    {opponentMove: shape.rock, selectedMove: shape.scissors, result: outcome.loss}, 
    {opponentMove: shape.paper, selectedMove: shape.rock, result: outcome.loss}, 
    {opponentMove: shape.paper, selectedMove: shape.paper, result: outcome.draw}, 
    {opponentMove: shape.paper, selectedMove: shape.scissors, result: outcome.win}, 
    {opponentMove: shape.scissors, selectedMove: shape.rock, result: outcome.win}, 
    {opponentMove: shape.scissors, selectedMove: shape.paper, result: outcome.loss}, 
    {opponentMove: shape.scissors, selectedMove: shape.scissors, result: outcome.draw}, 
]

const getMove = (move: string): shape => {
    switch(move){
        case "A": 
        case "X": 
            return shape.rock
        case "B": 
        case "Y": 
            return shape.paper
        case "C": 
        case "Z": 
            return shape.scissors
    }
}

const getOutcome = (outcomeString: string): outcome => {
    switch(outcomeString){
        case "X": 
            return outcome.loss
        case "Y": 
            return outcome.draw
        case "Z": 
            return outcome.win
    }
}

const calculateScoreOne = (moves: string[][]) => {

    let score: number = 0

    moves.forEach(movePair => {

        let opponentMove:shape = getMove(movePair[0])
        let selectedMove:shape = getMove(movePair[1])
        
        score += selectedMove

        score += opponentMove === selectedMove 
            ? outcome.draw
            : (selectedMove === outcomes.filter(x => x.opponentMove === opponentMove && x.result === outcome.win)[0].selectedMove
                ? outcome.win 
                : outcome.loss)
    });

    return score
}

const calculateScoreTwo = (moves: string[][]) => {

    let score: number = 0

    moves.forEach(pair => {

        let opponentMove:shape = getMove(pair[0])
        let requiredOutcome: outcome = getOutcome(pair[1])

        score += requiredOutcome
        score += outcomes.filter(x => x.opponentMove === opponentMove && x.result === requiredOutcome)[0].selectedMove

    });

    return score
}

export const logSolution = () => {

    const moves: string[][] = readFileSync(join(__dirname, 'input.txt'))
        .toString()
        .split(/\r?\n/)
        .map(x => x
            .split(/\s/)
        )

    console.log('Day 2: Rock Paper Scissors')
    console.log('\tpart 1 => ', calculateScoreOne(moves))
    console.log('\tpart 2 => ', calculateScoreTwo(moves))
}