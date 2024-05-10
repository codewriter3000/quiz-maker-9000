import { QuestionType, randomInt, randomIntWithMin } from '../index.js'

const RoundType = Object.freeze({
    TEN: 'ten',
    HUNDRED: 'hundred',
    THOUSAND: 'thousand',
    process: (round) => {
        switch (round) {
            case 1:
                return RoundType.TEN
            case 2:
                return RoundType.HUNDRED
            case 3:
                return RoundType.THOUSAND
        }
    },
    translate: (round) => {
        switch (round) {
            case RoundType.TEN:
                return 10
            case RoundType.HUNDRED:
                return 100
            case RoundType.THOUSAND:
                return 1000
        }
    }
})

const roundNumber = (num, type) => {
    const round = RoundType.translate(type)

    return Math.round(num / round) * round
}

const generateRoundInWords = (num) => {
    return RoundType.process(randomInt(num.toString().length - 1))
}

const roundWrongWay = (num, type) => {
    const round = RoundType.translate(type)

    return Math.round(num / round) * round === Math.floor(num / round) * round ? Math.ceil(num / round) * round : Math.floor(num / round) * round
    // const firstDigit = Number(num.toString().split('').reverse()[0])
}

const pickWrongRoundingType = (num, type) => {
    switch (type) {
        case 'ten':
            return randomInt(2) % 2 === 0 ? 'hundred' : 'thousand'
        case 'hundred':
            return randomInt(2) % 2 === 0 ? 'ten' : 'thousand'
        case 'thousand':
            return randomInt(2) % 2 === 0 ? 'hundred' : 'ten'
    }
}

export const generateMultipleChoiceRoundingQuestion = () => {
    const num = randomIntWithMin(11, 9999)
    const roundingType = generateRoundInWords(num)
    const wrongRoundingType = pickWrongRoundingType(num, roundingType)
    return {
        prompt: 'Round ' + num + ' to the nearest ' + roundingType + '.',
        type: QuestionType.MULTIPLE_CHOICE,
        correct_choice: roundNumber(num, roundingType),
        wrong_choices: [
            {   choice: roundWrongWay(num, roundingType)  },
            {   choice: roundNumber(num, wrongRoundingType)  },
            {   choice: roundWrongWay(num, wrongRoundingType)  },
        ]
    }
}

export const generateFixedBlankRoundingQuestion = () => {
    const num = randomIntWithMin(11, 9999)
    const roundingType = generateRoundInWords(num)
    return {
        prompt: 'Round ' + num + ' to the nearest ' + roundingType + '.',
        type: QuestionType.FIXED_BLANK,
        correct_answer: roundNumber(num, roundingType).toString()
    }
}