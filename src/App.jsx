import { useEffect, useState } from 'react'
import './App.css'
import { MultipleChoiceQuestion } from './components/MultipleChoiceQuestion.jsx'
import {
  generatePlaceValueQuestion, generateReversePlaceValueQuestion,
  generateMultipleChoiceRoundingQuestion, generateFixedBlankRoundingQuestion, randomInt, QuestionType
} from './lib/questions/generated/index.js'
import { FixedBlankQuestion } from './components/FixedBlankQuestion.jsx'

function App() {
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(1)

  const generateQuestion = () => {
    const randomNum = randomInt(4)

    switch (randomNum) {
      case 1:
        return generateFixedBlankRoundingQuestion()
      case 2:
        return generatePlaceValueQuestion()
      case 3:
        return generateReversePlaceValueQuestion()
      case 4:
        return generateMultipleChoiceRoundingQuestion()
    }
  }

  const [question, setQuestion] = useState(generateQuestion())

  useEffect(() => {
    setQuestion(generateQuestion())
  }, [questionCount])

  useEffect(() => {
    console.log(JSON.stringify(question))
  }, [question])

  return (
    <>
      {questionCount <= 10 ?
          <>
            {question.type === QuestionType.FIXED_BLANK ?
            <FixedBlankQuestion question={question}
                                    setScoreHandler={setScore}
                                    questionCount={questionCount}
                                    setQuestionCountHandler={setQuestionCount} />
                :
            <MultipleChoiceQuestion question={question}
                                setScoreHandler={setScore}
                                questionCount={questionCount}
                                setQuestionCountHandler={setQuestionCount} />
      }
          </> :
          <>
            Final Score: {score}
          </>}
    </>
  )
}

export default App
