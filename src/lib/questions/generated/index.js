const randomInt = (max) => {
    return Math.ceil(Math.random() * max)
}

export const QuestionType = Object.freeze({
    FIXED_BLANK: 0,
    MULTIPLE_CHOICE: 1,
    MULTIPLE_ANSWER: 2,
    BOOLEAN: 3,
    FREE_SHORT: 4,
    FREE_EXTENDED: 5,
    MATH: 6,
    APPROXIMATION: 7
})

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
 * @param placeValue
 * @returns {string}
 */
const getPlaceValue = (num, placeValue) => {
    for (let i = 0; i < num.toString().length; i++) {
        // console.log(num)
        // console.log(`num.toString()[i]: ${num.toString()[i]}`)
        // console.log(`placeValue: ${placeValue}`)
        if (num.toString()[i] === placeValue.toString()) {
            return translateDigitToPlaceValue(i)
        }
    }
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
    wrongChoices.add(rightChoice)

    while (wrongChoices.size < 4) {
        wrongChoices.add(Number(num.toString()[randomInt(num.toString().length - 1)]))
    }

    // console.log(`wrongChoices: ${[...wrongChoices]}`)
    return [...wrongChoices].slice(1)

    // return wrongChoices.map(wrongChoice => {
    //     return getPlaceValue(num, wrongChoice)
    // })
}

/**
 * generatePlaceValueQuestion: Generates the JSON needed for a place value question
 * @returns {{wrong_choices: [{choice: string},{choice: string},{choice: string},{choice: string}], correct_choice: (string), type: number, prompt: string}}
 */
export const generatePlaceValueQuestion = () => {
    const num = randomInt(999_999_999)
    // console.log(`num: ${num}`)
    const randomPlace = randomInt(num.toString().length - 1)
    // console.log(`randomPlace: ${randomPlace}`)
    const randomDigit = num.toString()[randomPlace]
    // console.log(`randomDigit: ${randomDigit}`)
    const randomPlaceValue = getPlaceValue(num, randomDigit)
    // console.log(`randomPlaceValue: ${randomPlaceValue}`)
    
    const wrongChoices = getWrongPlaceValueChoices(Number(randomDigit), num)

    console.log('What digit is in the ' + randomPlaceValue.toLowerCase() + ' place of ' + num + '?')
    console.log('Correct answer) ' + randomDigit)
    console.log('Wrong choices) ' + wrongChoices)

    return {
        prompt: 'What digit is in the ' + 'tens' + ' place of ' + num + '?',
        type: QuestionType.MULTIPLE_CHOICE,
        correct_choice: randomPlaceValue,
        wrong_choices: [
            {   choice: '' },
            {   choice: ''  },
            {   choice: ''  },
            {   choice: ''  },
        ]
    }
}