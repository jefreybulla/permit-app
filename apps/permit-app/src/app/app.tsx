// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
import { useEffect, useState } from 'react'
import { Question, QuestionType } from './shared-types'
import { mockApiGet, mockApiPost } from './mock-server/mock-api'

export function App() {

  const [question, setQuestion] = useState<Question>()
  const [ fetchStatus, setFetchStatus ] = useState('loading')
  const [ userAnswer, setUserAnswers ] = useState<string[]>([])
  const [ currentQuestionId, setCurrentQuestionId ] = useState<number>(1)
  const [ showWarning, setShowWarning ] = useState(false)

  const fetchQuestion = async (questionNumber: number) => {
    const response = await mockApiGet(questionNumber);
    console.log(response)
    setQuestion(response)
    setFetchStatus('ready')
  }

  useEffect(() => {
    fetchQuestion(currentQuestionId);
  }, [currentQuestionId]);

  const handleSubmit = async( event: React.FormEvent, lastQuestion : boolean | undefined ) => {
    event.preventDefault()
    if(userAnswer.length === 0){
      setShowWarning(true)
      return
    }
    const response = await mockApiPost(currentQuestionId, userAnswer)
    setUserAnswers([])
    if (lastQuestion) {
      console.log('last question')
      setFetchStatus('end')
    }
    else{
      console.log('next question')
      setCurrentQuestionId(response.nextQuestionId)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handle multiple choice with multiple answers
    if(question?.questionType === QuestionType.multipleChoiceMultipleAnswers){
      const answerClone = structuredClone(userAnswer)
      const index = answerClone.indexOf(event.target.value);
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
    if (question?.questionType === QuestionType.text) {
      return (
        <input key={question.questionId} type="text" onChange = {(event) => handleChange(event)} required/>
    )}
    if(question?.options){
      if (question?.questionType === QuestionType.multipleChoiceUniqueAnswer) {
        return question.options.map((option, index) => {
          return (
            <div key={index}>
              <input key={question.questionId} type="radio" name="option" value={option} onChange = {(event) => handleChange(event)} required/>
              <label>{option}</label>
            </div>
          )
        })
      }
      if (question?.questionType === QuestionType.multipleChoiceMultipleAnswers) {
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

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (fetchStatus === 'end') {
    return <div>We are on it. Thanks!</div>
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, question?.lastQuestion )}>
        <p>{question?.content}</p>
        {showWarning && <p className={styles.alert}>To procced enter your answer below</p>}
        { renderInputs() } 
        { question?.lastQuestion ?
          <button type='submit'>
            Submit
          </button>
          : 
          <button type='submit'>
          Next
          </button>
        }
      </form>
    </div>
  );
}

export default App;