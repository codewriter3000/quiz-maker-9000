import { useEffect, useState } from 'react'

export const MultipleChoiceQuestion = ({ question, setScoreHandler, questionCount, setQuestionCountHandler }) => {

  const correctChoice = question.correct_choice
  const [shuffledChoices, setShuffledChoices] = useState([])

  useEffect(() => {
      setShuffledChoices([
          question.correct_choice,
          question.wrong_choices[0].choice,
          question.wrong_choices[1].choice,
          question.wrong_choices[2].choice
      ].sort(() => Math.random() - 0.5))
  }, [question])

  const validateAnswer = (answer) => {
    if (answer === correctChoice) {
        console.log('CORRECT')
        setScoreHandler(score => score + 1)
    } else {
        console.log('WRONG')
        console.log(`Correct answer: ${correctChoice}`)
    }

    setQuestionCountHandler(questionCount => questionCount + 1)
  }

  return (
    <>
      <h1>{questionCount}) {question.prompt}</h1>
        <div className="card">
            {shuffledChoices.map((choice, key) => {
                return (
                    <button key={key} onClick={() => validateAnswer(choice)}>
                        {String.fromCharCode(key + 65)}) {choice}
                    </button>
                )
            })}
        </div>
        <p className="read-the-docs">
            Made by codewriter3000
        </p>
    </>
  )
}