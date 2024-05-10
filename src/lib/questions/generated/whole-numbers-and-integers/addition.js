import { QuestionType, randomInt } from '../index.js'

export const generateAdditionQuestion = () => {
    const addends = [randomInt(9999), randomInt(9999)]

    return {
        prompt: 'Solve ' + addends[0] + ' + ' + addends[1] + '.',
        type: QuestionType.FIXED_BLANK,
        correct_answer: (addends[0] + addends[1]).toString()
    }
}

export const generateTripleAdditionQuestion = () => {
    const addends = [randomInt(9999), randomInt(9999), randomInt(9999)]

    return {
        prompt: 'Solve ' + addends[0] + ' + ' + addends[1] + ' + ' + addends[2] + '.',
        type: QuestionType.FIXED_BLANK,
        correct_answer: (addends[0] + addends[1] + addends[2]).toString()
    }
}