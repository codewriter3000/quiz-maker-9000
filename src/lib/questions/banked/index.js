import orderOfOperations from './orderOfOperations.json'
import primeFactorization from './primeFactorization.json'
import { randomInt } from '../generated/index.js'

const _ = (jsonFile) => {
    return jsonFile['questions'][randomInt(jsonFile['questions'].length - 1)]
}

const generateOrderOfOperationsQuestion = () => _(orderOfOperations)

const generatePrimeFactorizationQuestion = () => _(primeFactorization)

export { generateOrderOfOperationsQuestion, generatePrimeFactorizationQuestion }