import { QuestionType, randomIntWithMin } from '../index.js'

export const generateSubtractionQuestion = () => {
    const minuend = randomIntWithMin(1000, 9999)
    const subtrahend = randomIntWithMin(1000, 9999)

    return {
        prompt: 'Solve ' + minuend + ' - ' + subtrahend + '.',
        type: QuestionType.FIXED_BLANK,
        correct_answer: (minuend - subtrahend).toString()
    }
}