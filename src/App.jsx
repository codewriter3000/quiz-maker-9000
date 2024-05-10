import { useEffect, useState } from 'react'
import './App.css'
import { MultipleChoiceQuestion } from './components/MultipleChoiceQuestion.jsx'
import {
    generatePlaceValueQuestion,
    generateReversePlaceValueQuestion,
    generateMultipleChoiceRoundingQuestion,
    generateFixedBlankRoundingQuestion,
    randomInt,
    QuestionType,
    generateAdditionQuestion,
    generateTripleAdditionQuestion,
    generateSubtractionQuestion,
    generateMultiplicationQuestion,
    generateDivisionQuestion,
    generateIntegerComparisonQuestion,
} from './lib/questions/generated/index.js'
import { FixedBlankQuestion } from './components/FixedBlankQuestion.jsx'
import {
    generateOrderOfOperationsQuestion,
    generatePrimeFactorizationQuestion
} from './lib/questions/banked/index.js'
import { MultipleAnswerQuestion } from './components/MultipleAnswerQuestion.jsx'
import { generateDivisibilityQuestion } from './lib/questions/generated/divisibility.js'

const generateRandomPlaceValueQuestion = () => {
    const randomNum = randomInt(4)
    switch (randomNum) {
        case 1: return generateFixedBlankRoundingQuestion()
        case 2: return generatePlaceValueQuestion()
        case 3: return generateReversePlaceValueQuestion()
        case 4: return generateMultipleChoiceRoundingQuestion()
    }
}

const generateRandomIntegerArithmeticQuestion = () => {
    const randomNum = randomInt(8)

    switch (randomNum) {
        case 1: return generateRandomPlaceValueQuestion()
        case 2: return generateAdditionQuestion()
        case 3: return generateTripleAdditionQuestion()
        case 4: return generateSubtractionQuestion()
        case 5: return generateMultiplicationQuestion()
        case 6: return generateDivisionQuestion()
        case 7: return generateOrderOfOperationsQuestion()
        case 8: return generateIntegerComparisonQuestion()
    }
}

const generateRandomDivisibilityAndFactorizationQuestion = () => {
    const randomNum = randomInt(1)

    switch (randomNum) {
        case 1: return generatePrimeFactorizationQuestion()
    }
}

const generateRandomFractionQuestion = () => {

}

const generateRandomDecimalAndPercentQuestion = () => {

}

const generateRandomExponentQuestion = () => {

}

const generateRandomStatisticsQuestion = () => {

}

function App() {
    const [score, setScore] = useState(0)
    const [questionCount, setQuestionCount] = useState(1)

    const generateQuestion = () => {
        return generateRandomDivisibilityAndFactorizationQuestion()

        const randomNum = randomInt(25)

        if (randomNum <= 25) {
            return generateRandomIntegerArithmeticQuestion()
        } else if (randomNum <= 40) {
            return generateRandomDivisibilityAndFactorizationQuestion()
        } else if (randomNum <= 60) {
            return generateRandomFractionQuestion()
        } else if (randomNum <= 80) {
            return generateRandomDecimalAndPercentQuestion()
        } else if (randomNum <= 95) {
            return generateRandomExponentQuestion()
        } else if (randomNum <= 100) {
            return generateRandomStatisticsQuestion()
        }
    }

    const [question, setQuestion] = useState(generateQuestion())

    useEffect(() => {
        setQuestion(generateQuestion())
    }, [questionCount])

    useEffect(() => {
        console.log(JSON.stringify(question))
        console.log('###############################################################################')
    }, [question])

    return (
        <>
            {questionCount <= 7 ?
                <>
                    {question.type === QuestionType.FIXED_BLANK ?
                        <FixedBlankQuestion question={question}
                                            setScoreHandler={setScore}
                                            questionCount={questionCount}
                                            setQuestionCountHandler={setQuestionCount}/>
                        :
                        <>
                            {question.type === QuestionType.MULTIPLE_ANSWER ?
                                <MultipleAnswerQuestion question={question}
                                                        setScoreHandler={setScore}
                                                        questionCount={questionCount}
                                                        setQuestionCountHandler={setQuestionCount}/>
                                :
                                <MultipleChoiceQuestion question={question}
                                                        setScoreHandler={setScore}
                                                        questionCount={questionCount}
                                                        setQuestionCountHandler={setQuestionCount}/>}
                        </>
                    }
                </> :
                <>
                    Final Score: {score}
                </>}
        </>
    )
}

export default App
