import { QuestionType, randomInt, randomIntWithMin } from '../index.js'

export const generateMultiplicationQuestion = () => {
    const leftFactor = randomIntWithMin(50, 999)
    const rightFactor = randomInt(leftFactor)

    return {
        prompt: 'Solve ' + leftFactor + ' * ' + rightFactor + '.',
        type: QuestionType.FIXED_BLANK,
        correct_answer: (leftFactor * rightFactor).toString()
    }
}