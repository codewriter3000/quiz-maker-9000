import {QuestionType, randomDiverseInt, randomInt, randomIntWithUniqueDigits} from './index.js';

const PlaceValues = Object.freeze({
    ONES: 'Ones',
    TENS: 'Tens',
    HUNDREDS: 'Hundreds',
    THOUSANDS: 'Thousands',
    TEN_THOUSANDS: 'Ten thousands',
    HUNDRED_THOUSANDS: 'Hundred thousands',
    MILLIONS: 'Millions',
    TEN_MILLIONS: 'Ten millions',
    HUNDRED_MILLIONS: 'Hundred millions'
})

/**
 * Takes a digit, and gives you the place value
 * @param digit
 * @returns {string}
 */
const translateDigitToPlaceValue = (digit) => {
    switch (digit) {
        case 8:
            return PlaceValues.ONES
        case 7:
            return PlaceValues.TENS
        case 6:
            return PlaceValues.HUNDREDS
        case 5:
            return PlaceValues.THOUSANDS
        case 4:
            return PlaceValues.TEN_THOUSANDS
        case 3:
            return PlaceValues.HUNDRED_THOUSANDS
        case 2:
            return PlaceValues.MILLIONS
        case 1:
            return PlaceValues.TEN_MILLIONS
        case 0:
            return PlaceValues.HUNDRED_MILLIONS
    }
    throw Error('Digit does not represent valid place value')
}

/**
 * Takes a random number and a random digit in that number, then gives you the place value in a word
 * @param num
 * @param digit
 * @returns {string}
 */
const getPlaceValue = (num, digit) => {
    for (let i = 0; i < num.toString().length; i++) {
        if (num.toString()[i] === digit.toString()) {
            return translateDigitToPlaceValue(i)
        }
    }
}

/**
 * Gets the place value of a digit in a number
 * @param num
 * @param digit
 * @returns {number}
 */
const getPlaceValueAsDigit = (num, digit) => {
    for (let i = 0; i < num.toString().length; i++) {
        if (num.toString()[i] === digit.toString()) {
            return i
        }
    }
}

/**
 * getRandomDigit: Gets random digit from a long number num
 * @param num
 * @returns {string}
 */
const getRandomDigit = (num) => {
    return num.toString().split('')[randomInt(num.toString().length - 1)]
}

/**
 * getWrongPlaceValueChoices: Generates unique random numbers
 *
 * @param rightChoice
 * @param num
 * @returns {*[]}
 */
const getWrongPlaceValueChoices = (rightChoice, num) => {
    let wrongChoices = new Set()
    wrongChoices.add(Number(rightChoice))

    while (wrongChoices.size < 4) {
        const possibleNum = Number(num.toString()[randomInt(num.toString().length - 1)])
        wrongChoices.add(possibleNum)
    }

    return [...wrongChoices].slice(1)
}

/**
 * Input this function the same way you would input for getWrongPlaceValueChoices, except you're getting a place value in words
 * @param rightChoice
 * @param num
 * @returns {string[]}
 */
const getWrongReversePlaceValueChoices = (rightChoice, num) => {
    return getWrongPlaceValueChoices(rightChoice, num).map(wrongChoice => {
        return getPlaceValue(num, wrongChoice)
    })
}

const stringifyNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * generatePlaceValueQuestion: Generates the JSON needed for a place value question
 * @returns {{wrong_choices: [{choice: *},{choice: *},{choice: *}], correct_choice: string, type: number, prompt: string}}
 */
export const generatePlaceValueQuestion = () => {
    let num = randomDiverseInt(999_999_999)
    // console.log(`num: ${num}`)
    const randomPlace = randomInt(num.toString().length - 1)
    // console.log(`randomPlace: ${randomPlace}`)
    const randomDigit = Number(num.toString()[randomPlace])
    // console.log(`randomDigit: ${randomDigit}`)
    const randomPlaceValue = getPlaceValue(num, randomDigit)
    // console.log(`randomPlaceValue: ${randomPlaceValue}`)

    const wrongChoices = getWrongPlaceValueChoices(Number(randomDigit), num)

    // console.log('What digit is in the ' + randomPlaceValue.toLowerCase() + ' place of ' + num + '?')
    // console.log('Correct answer) ' + randomDigit)
    // console.log('Wrong choices) ' + wrongChoices)

    return {
        prompt: 'What digit is in the ' + randomPlaceValue.toLowerCase() + ' place of ' + stringifyNumber(num) + '?',
        type: QuestionType.MULTIPLE_CHOICE,
        correct_choice: randomDigit,
        wrong_choices: [
            {   choice: wrongChoices[0]  },
            {   choice: wrongChoices[1]  },
            {   choice: wrongChoices[2]  },
        ]
    }
}

export const generateReversePlaceValueQuestion = () => {
    // console.log('generating reverse place value question')
    const num = randomIntWithUniqueDigits(9)
    // console.log(`num: ${num}`)
    const digit = getRandomDigit(num)
    // console.log(`digit: ${digit}`)
    const correctAnswer = getPlaceValueAsDigit(num, digit)
    const wrongChoices = getWrongReversePlaceValueChoices(digit, num)
    // console.log(`wrongChoices: ${wrongChoices}`)

    return {
        prompt: 'What is the place value of the digit ' + digit + ' in the number ' + stringifyNumber(num) + '?',
        type: QuestionType.MULTIPLE_CHOICE,
        correct_choice: translateDigitToPlaceValue(correctAnswer),
        wrong_choices: [
            {   choice: wrongChoices[0]  },
            {   choice: wrongChoices[1]  },
            {   choice: wrongChoices[2]  },
        ]
    }
}