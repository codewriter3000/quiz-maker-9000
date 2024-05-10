import { QuestionType, randomInt, randomIntWithMin } from '../index.js'

export const generateIntegerComparisonQuestion = () => {
    const leftComparison = randomIntWithMin(-20, 20)
    const rightComparison = randomIntWithMin(-20, 20)
    const useAbsoluteValueOnLeft = randomInt(2) % 2 === 0
    const useAbsoluteValueOnRight = randomInt(2) % 2 === 0
    const useChangeOperationOnLeft = randomInt(2) % 2 === 0
    const useChangeOperationOnRight = randomInt(2) % 2 === 0

    return {
        prompt: 'Complete the following comparison: '
            + (useAbsoluteValueOnLeft && leftComparison < 0 ? '-' : '')
            + (useAbsoluteValueOnLeft ? '|' : '')
            + (useChangeOperationOnLeft && leftComparison > 0 ? '-' : '') + leftComparison
            + (useAbsoluteValueOnLeft ? '|' : '')
            + ' _ '
            + (useAbsoluteValueOnRight && rightComparison < 0 ? '-' : '')
            + (useAbsoluteValueOnRight ? '|' : '')
            + (useChangeOperationOnRight && rightComparison > 0 ? '-' : '') + rightComparison
            + (useAbsoluteValueOnRight ? '|' : '')
            + '.',
        type: QuestionType.MULTIPLE_CHOICE,
        correct_choice: rightComparison - leftComparison > 0 ? '<' :
            rightComparison - leftComparison === 0 ? '=' :
            '>',
        wrong_choices: [
            {   choice: rightComparison - leftComparison > 0 ? '=' :
                    rightComparison - leftComparison === 0 ? '>' :
                        '<' },
            {   choice: rightComparison - leftComparison > 0 ? '>' :
                    rightComparison - leftComparison === 0 ? '<' :
                        '=' },
            {   choice: '+' }
        ]
    }
}