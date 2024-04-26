import { useState } from 'react'
import './App.css'
import { Question } from "./components/Question.jsx";
import { generatePlaceValueQuestion } from "./lib/questions/generated/index.js";

function App() {
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(1)

  const question = generatePlaceValueQuestion()

  return (
    <>
      {questionCount <= 10 ?
          <>
            <Question question={question}
                      setScoreHandler={setScore}
                      questionCount={questionCount}
                      setQuestionCountHandler={setQuestionCount} />
          </> :
          <>
            Final Score: {score}
          </>}
    </>
  )
}

export default App
