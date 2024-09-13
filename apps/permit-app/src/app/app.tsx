// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
import { useEffect, useState } from 'react'
import { Question, QuestionType, FetchStatus } from './shared-types'
import { mockApiGet, mockApiPost } from './mock-server/mock-api'

export function App() {

  const [ question, setQuestion] = useState<Question>()
  const [ fetchStatus, setFetchStatus ] = useState(FetchStatus.LOADING)
  const [ userAnswer, setUserAnswers ] = useState<string[]>([])
  const [ currentQuestionId, setCurrentQuestionId ] = useState<number>(1)
  const [ showWarning, setShowWarning ] = useState(false)
  const [ outcome, setOutcome ] = useState<string>()

  const fetchQuestion = async (questionNumber: number) => {
    const response = await mockApiGet(questionNumber)
    setQuestion(response)
    setFetchStatus(FetchStatus.READY)
  }

  useEffect(() => {
    fetchQuestion(currentQuestionId)
  }, [currentQuestionId])

  const handleSubmit = async( event: React.FormEvent ) => {
    event.preventDefault()
    if(userAnswer.length === 0){
      setShowWarning(true)
      return
    }
    const response = await mockApiPost(currentQuestionId, userAnswer)
    setUserAnswers([])
    if (response.nextQuestionId === -1) {
      setFetchStatus(FetchStatus.OUTCOME)
      setOutcome(response.outcome)
    }
    else{
      setCurrentQuestionId(response.nextQuestionId)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handle multiple choice with multiple answers
    if(question?.questionType === QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS){
      const answerClone = structuredClone(userAnswer)
      const index = answerClone.indexOf(event.target.value)
      if (index > -1) { // only splice when item is already included
        answerClone.splice(index, 1)
        setUserAnswers( answerClone )
        return
      }
      else{
        setUserAnswers( [ ...answerClone, event.target.value ] )
        return
      }
    }
    setUserAnswers( [ event.target.value ] )
  }

  const renderInputs = () => {
    if (question?.questionType === QuestionType.TEXT) {
      return (
        <input key={question.questionId} type="text" onChange = {(event) => handleChange(event)} required/>
    )}
    if(question?.options){
      if (question?.questionType === QuestionType.MULTIPLE_CHOICE_UNIQUE_ANSWER) {
        return question.options.map((option, index) => {
          return (
            <div key={index}>
              <input key={question.questionId} type="radio" name="option" value={option} onChange = {(event) => handleChange(event)} required/>
              <label>{option}</label>
            </div>
          )
        })
      }
      if (question?.questionType === QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS) {
        return question.options.map((option, index) => {
          return (
            <div key={index}>
              <input key={question.questionId} type="checkbox" name="option" value={option} onChange = {(event) => handleChange(event)}/>
              <label>{option}</label>
            </div>
          )
        })
      }
    }
  }

  const renderWarning = () => {
    if(showWarning){
      return <p className={styles.alert}>To procceed enter your answer below</p>
    }
  }

  if (fetchStatus === FetchStatus.LOADING) {
    return <div>Loading...</div>
  }

  if (fetchStatus === FetchStatus.OUTCOME) {
    return <div>{ outcome }</div>
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event )}>
        <p>{question?.content}</p>
        { renderWarning() }
        { renderInputs() } 
        <button type='submit'>
          Next
        </button>
      </form>
    </div>
  )
}

export default App