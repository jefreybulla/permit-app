import styles from './app.module.scss'
import { useEffect, useState } from 'react'
import { Question, QuestionType, FetchStatus, Outcome } from './shared-types'
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
        <input 
          key={question.questionId}
          type="text"
          onChange = {(event) => handleChange(event)}
          required
        />
    )}
    if(question?.options){
      if (question?.questionType === QuestionType.MULTIPLE_CHOICE_UNIQUE_ANSWER) {
        return question.options.map((option, index) => {
          return (
            <div key={index}>
              <input 
                key={question.questionId}
                type="radio"
                name="option"
                value={option}
                onChange = {(event) => handleChange(event)} 
                className = {styles.radioInput}
                required
              />
              <label className={styles.label}>{option}</label>
            </div>
          )
        })
      }
      if (question?.questionType === QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS) {
        return question.options.map((option, index) => {
          return (
            <div key={index}>
              <input 
                key={question.questionId}
                type="checkbox"
                name="option"
                value={option}
                onChange = {(event) => handleChange(event)}
                className = {styles.radioInput}
              />
              <label className={styles.label}>{option}</label>
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
    if (outcome === Outcome.IHR) {
      return(
        <div className={styles.needPermit}>
          <p>
            <span className={styles.checkIcon}>&#x2705;</span>
            <span className={styles.outcomeTitle}>In-House Review Process</span>
          </p>
          <ul>
            <li>A building permit is required.</li>
            <li>Include plan sets.</li>
            <li>Submit application for in-house review.</li>
          </ul>
        </div>
      )
    }
    if (outcome === Outcome.OTC) {
      return(
        <div className={styles.needPermit}>
          <p>
            <span className={styles.checkIcon}>&#x2705;</span>
            <span className={styles.outcomeTitle}>Over-the-Counter Submission Process</span>
          </p>
          <ul>
            <li>A building permit is required.</li>
            <li>Submit application for OTC review.</li>
          </ul>
        </div>
      )
    }
    if (outcome === Outcome.NPR) {
      return(
        <div className={styles.needNoPermit}>
          <p>
            <span className={styles.checkIcon}>&#x274C;</span>
            <span className={styles.outcomeTitle}>No Permit</span>
          </p>
          <ul>
            <li>Nothing is required! You’re set to build.</li>
          </ul>
        </div>
      )
    }
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event )}>
        <p>{question?.content}</p>
        { renderWarning() }
        { renderInputs() } 
        <button type='submit' className={styles.nextButton}>
          Next
        </button>
      </form>
    </div>
  )
}

export default App