import { useEffect, useState } from 'react'

export const MultipleAnswerQuestion = ({ question, setScoreHandler, questionCount, setQuestionCountHandler }) => {

    const [shuffledChoices, setShuffledChoices] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([])

    useEffect(() => {
        setShuffledChoices([
                ...question['correct_answers'],
                ...question['wrong_answers']
        ].sort(() => Math.random() - 0.5))
        setSelectedAnswers([])
    }, [question])

    const validateAnswer = () => {
        let tmp = [...selectedAnswers]

        let correctAnswersArr = []
        for (let correctAnswer of question['correct_answers']) {
            correctAnswersArr = [...correctAnswersArr, correctAnswer.choice]
        }

        let wrongAnswersArr = []
        for (let wrongAnswer of question['wrong_answers']) {
            wrongAnswersArr = [...wrongAnswersArr, wrongAnswer.choice]
        }

        for (let correctAnswer of correctAnswersArr) {
            if (tmp.includes(correctAnswer)) {
                tmp = [...tmp].filter(t => t !== correctAnswer)
            }
        }

        for (let wrongAnswer of wrongAnswersArr) {
            if (selectedAnswers.includes(wrongAnswer)) {
                tmp = [...tmp, wrongAnswer]
            }
        }

        if (tmp.length === 0) {
            console.log('CORRECT')
            setScoreHandler(score => score + 1)
        } else {
            console.log('WRONG')
        }

        setQuestionCountHandler(questionCount => questionCount + 1)
    }

    return (
        <>
            <h1>{questionCount}) {question.prompt}</h1>
            <h2>Select all that apply.</h2>
            <div className="card">
                {shuffledChoices.map(({choice: choice}, key) => {
                    return (
                        <button className={selectedAnswers.includes(choice) ? 'bg-blue-500' : ''}
                                key={key} onClick={() => {
                            if (!(selectedAnswers.includes(choice))) {
                                setSelectedAnswers(selectedAnswers =>
                                    [...selectedAnswers, choice])
                            } else {
                                setSelectedAnswers(selectedAnswers =>
                                    [...selectedAnswers].filter(ans => ans !== choice))
                            }
                        }}>
                            {String.fromCharCode(key + 65)}) {choice}
                        </button>
                    )
                })}
                <button onClick={() => validateAnswer()}>
                    Submit
                </button>
            </div>
            <p className="read-the-docs">
                Made by codewriter3000
            </p>
        </>
    )
}