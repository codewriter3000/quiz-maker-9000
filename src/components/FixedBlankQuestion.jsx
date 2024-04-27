import { useRef } from 'react'

export const FixedBlankQuestion = ({ question, setScoreHandler, questionCount, setQuestionCountHandler }) => {

  const correctChoice = question.correct_answer

  const answer = useRef(null)

  const validateAnswer = () => {
    if (answer.current.value === correctChoice) {
        console.log('CORRECT')
        setScoreHandler(score => score + 1)
    } else {
        console.log('WRONG')
        console.log(`Correct answer: ${correctChoice} (${typeof correctChoice})`)
        console.log(`Your answer: ${answer.current.value} (${typeof answer.current.value})`)
    }

    setQuestionCountHandler(questionCount => questionCount + 1)
  }

  return (
    <>
      <h1>{questionCount}) {question.prompt}</h1>
        <div className="card">
            <input type='text' ref={answer} />
            <button onClick={validateAnswer}>Submit</button>
        </div>
        <p className="read-the-docs">
            Made by codewriter3000
        </p>
    </>
  )
}