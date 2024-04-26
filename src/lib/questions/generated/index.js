const randomInt = (max) => {
    return Math.ceil(Math.random() * max)
}

const randomDiverseInt = (max) => {
    if (max < 9) {
        throw Error('In randomDiverseInt(max), max must be at least 9.')
    }

    let tmpNum = Math.ceil(Math.random() * max)
    let tmpNumArr = tmpNum.toString().split('')

    let occurrences = []
    for (let i = 0; i < tmpNumArr.length; i++) {
        if (!(tmpNumArr[i] in occurrences)) {
            occurrences = [...occurrences, { [tmpNumArr[i]]: 1 }]
        } else {
            occurrences[`${tmpNumArr[i]}`] += 1
        }
    }

    if (occurrences.length < 6) {
        console.log('saved you from a potentially infinite loop')
        return randomDiverseInt(max)
    }

    return tmpNum
}

const QuestionType = Object.freeze({
    FIXED_BLANK: 0,
    MULTIPLE_CHOICE: 1,
    MULTIPLE_ANSWER: 2,
    BOOLEAN: 3,
    FREE_SHORT: 4,
    FREE_EXTENDED: 5,
    MATH: 6,
    APPROXIMATION: 7
})

import { generatePlaceValueQuestion } from './placeValue.js';
export { generatePlaceValueQuestion, randomInt, randomDiverseInt, QuestionType }