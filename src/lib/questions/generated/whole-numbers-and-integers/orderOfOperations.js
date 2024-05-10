import { QuestionType, randomCompositeFactorPair, randomInt, randomIntWithMin } from '../index.js'

const branch = (expr, iterations) => {

    let stackMachine = []
    for (let i = 0; i < expr.length; i++) {
        if (isNaN(expr[i]) && expr[i] !== '-') {
            stackMachine = [...stackMachine, {
                token: 'SYMBOL',
                index: i,
                symbol: expr[i]
            }]
        // } else if (expr[i] === '-') {
        //     stackMachine = [...stackMachine, {
        //         token: 'NEGATIVE',
        //         index: i,
        //         symbol: expr[i]
        //     }]
        } else if (!isNaN(expr[i]) || expr[i] === '-') {
            stackMachine = [...stackMachine, {
                token: 'NUMBER',
                index: i,
                symbol: expr[i]
            }]
        } else {
            console.log(expr[i])
            throw Error('Invalid symbol in expr')
        }
    }

    console.log(expr)
    console.log(`stackMachine: ${JSON.stringify(stackMachine)}`)

    let returnStack = []
    let inQueue = {}
    for (let i = 0; i < stackMachine.length; i++) {
        // console.log(`returnStack: ${returnStack}`)
        // console.log(`inQueue: ${JSON.stringify(inQueue)}`)
        // console.log(`stackMachine: ${JSON.stringify(stackMachine)}`)
        if (i === 0) {
            inQueue = {symbol: stackMachine[i].symbol, token: stackMachine[i].token}
            // console.log(`initialized inQueue: ${JSON.stringify(inQueue)}`)
        } else if (inQueue.token === stackMachine[i].token) {
            inQueue.symbol = inQueue.symbol.concat(stackMachine[i].symbol)
            // console.log(`appended to inQueue: ${JSON.stringify(inQueue)}`)
        } else {
            // console.log(returnStack[returnStack.length - 1])
            // console.log(stackMachine[i].token)
            returnStack = [...returnStack, inQueue]
            // console.log(`dumped inQueue: ${JSON.stringify(returnStack)}`)
            inQueue = { symbol: stackMachine[i].symbol, token: stackMachine[i].token }
            // console.log(`replaced inQueue: ${JSON.stringify(inQueue)}`)
        }
    }

    returnStack = [...returnStack, inQueue]

    console.log(`returnStack: ${JSON.stringify(returnStack)}`)
    // console.log(returnStack)

    for (let i = 0; i < returnStack.length; i++) {
        console.log(`returnStack[i].symbol: ${JSON.stringify(returnStack[i].symbol)}`)
        if (returnStack[i].token === 'NUMBER') {
            returnStack[i] = generateOperation(returnStack[i].symbol, iterations - 1)
        } else if(returnStack[i].token === 'SYMBOL') {
            returnStack[i] = returnStack[i].symbol
        }
    }

    // final clean-up
    for (let i = 0; i < returnStack.length; i++) {
        if (i < returnStack.length - 1) {
            if (returnStack[i] === '+' && returnStack[i + 1] === '-') {
                returnStack = [...returnStack.slice(0, i), ...returnStack.slice(i + 1)]
            }
            if (returnStack[i] === '-' && returnStack[i + 1] === '-') {
                returnStack = [...returnStack.slice(0, i), ...returnStack.slice(i + 1)]
            }
        }
    }

    returnStack = returnStack.join('')

    console.log(`returnStack post processing: ${returnStack}`)

    return returnStack
}

const generateOperation = (num, iterations, expr = num) => {
    let operand = randomIntWithMin(-12, 12)
    const operation = randomInt(4)

    if (iterations === 0) {
        return num
    }

    // branch(Number(expr - operand) + '+' + operand, 5)
    let branchNum = 0

    if (operation === 1) {
        branchNum = Number(expr - operand) + '+' + operand
    } else if(operation === 2) {
        branchNum = Number(expr + operand) + '+-' + operand
    } else if(operation === 3) {
        const [factor, product] = randomCompositeFactorPair(12, true)
        branchNum = Number(product / factor) + '\\times' + factor
    } else if(operation === 4) {
        branchNum = '\\frac{' + Number(num * operand) + '}{' + operand + '}'
    } else {
        throw Error('Invalid operation')
    }

    return branch(branchNum, iterations)
}

export const generateOrderOfOperationsQuestion = () => {
    const num = randomIntWithMin(-12, 12)

    return {
        prompt: 'Solve the following: ',
        math: '\\(' + generateOperation(num, 1) + '\\)',
        type: QuestionType.FIXED_BLANK,
        correct_answer: num
    }
}