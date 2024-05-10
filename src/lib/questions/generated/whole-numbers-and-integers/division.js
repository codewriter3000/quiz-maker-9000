import { QuestionType, randomInt, randomIntWithMin } from '../index.js'

export const generateDivisionQuestion = () => {
    const quotient = randomIntWithMin(13, 998)
    const divisor = randomInt(9)

    return {
        prompt: 'Solve ' + quotient * divisor + ' / ' + divisor + '.',
        type: QuestionType.FIXED_BLANK,
        correct_answer: quotient.toString()
    }
}