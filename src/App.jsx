import { useState } from 'react'
import './App.css'
import { Question } from "./components/Question.jsx";
import { generatePlaceValueQuestion } from "./lib/questions/generated/index.js";

function App() {
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(1)

  generatePlaceValueQuestion()

  return (
    <>
      {questionCount < 10 ?
          <>

          </> :
          <>
            Final Score: {score}
          </>}
    </>
  )
}

export default App
