import {QuestionType, randomInt, randomIntWithMin, randomIntWithUniqueDigits} from './index.js'

const generateCorrectAnswers = (divisor, numOfCorrectAnswers) => {
    let correctAnswers = []

    for (let i = 0; i < numOfCorrectAnswers; i++) {
        correctAnswers = [...correctAnswers, divisor * randomIntWithUniqueDigits(19, 99)]
    }

    return correctAnswers
}

const generateWrongAnswers = (divisor, numOfWrongAnswers) => {
    let wrongAnswers = []

    for (let i = 0; i < numOfWrongAnswers; i++) {
        const salt = randomInt(divisor - 1)
        let wrongAnswer = (divisor + salt) * randomInt(99)

        wrongAnswer = wrongAnswer % 2 === 0 ? wrongAnswer - 1 : wrongAnswer
        wrongAnswers = [...wrongAnswers, wrongAnswer]
    }

    return wrongAnswers
}

export const generateDivisibilityQuestion = () => {
    const divisor = randomIntWithMin(3, 10)
    const numOfCorrectAnswers = randomIntWithMin(1, 7)

    let correctAnswers = generateCorrectAnswers(divisor, numOfCorrectAnswers)
    let wrongAnswers = generateWrongAnswers(divisor, 8 - numOfCorrectAnswers)

    return {
        prompt: 'Which of the following numbers is divisible by ' + divisor + '?',
        type: QuestionType.MULTIPLE_ANSWER,
        correct_answers: correctAnswers,
        wrong_answers: wrongAnswers
    }
}