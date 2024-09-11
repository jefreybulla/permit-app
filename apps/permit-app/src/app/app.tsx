// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
import { useEffect, useState } from 'react'
import { Question, QuestionType } from './shared-types'
import { mockApiGet } from './mock-server/mock-api'

export function App() {

  const [question, setQuestion] = useState<Question>();
  const [ fetchStatus, setFetchStatus ] = useState('loading');
  const [ userAnswer, setUserAnswers ] = useState<string[]>([]);
  const [ currentQuestionId, setCurrentQuestionId ] = useState<number>(1);

  const fetchQuestion = async (questionNumber: number) => {
    const response = await mockApiGet({  questionNumber });
    console.log(response)
    setQuestion(response)
    setFetchStatus('ready')
  }

  useEffect(() => {
    fetchQuestion(currentQuestionId);
  }, [currentQuestionId]);

  const handleSubmit = async({lastQuestion = false}) => {
    /*
    const response = await fetch(`${apiRoot}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question_id: question?.currentQuestion,
        response: userAnswer,
      })
    });
    const data = await response.json();
    console.log(data);
    // response should contain the next questionId
    */

    //console.log('last question', lastQuestion);
    if (lastQuestion) {
      console.log('last question');
      setFetchStatus('end');
    }
    else{
      console.log('next question');
      setCurrentQuestionId(currentQuestionId + 1);
    }

  }

  const handleChange = (e: any) => {
    setUserAnswers([e.target.value]);
    // WIP for multiple_choice_multiple
    //setUserAnswers([...userAnswer, e.target.value]);
  }

  const renderInputs = () => {
    if (question?.type === QuestionType.multipleChoiceUniqueAnswer) {
      return question.options.map((option, index) => {
        return (
          <div key={index}>
            <input type="radio" name="option" value={option} onChange = {(e) => handleChange(e)}/>
            <label>{option}</label>
          </div>
        )
      })
    }
    if (question?.type === QuestionType.multipleChoiceMultipleAnswers) {
      return question.options.map((option, index) => {
        return (
          <div key={index}>
            <input type="checkbox" name="option" value={option} onChange = {(e) => handleChange(e)}/>
            <label>{option}</label>
          </div>
        )
      })
    }
    if (question?.type === 'text') {
      return (
        <input type="text" onChange = {(e) => handleChange(e)} />
      )}
  }

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (fetchStatus === 'end') {
    return <div>We are on it. Thanks!</div>
  }

  return (
    <div>
        <h1 className={styles.title}>{question?.title}</h1>
        <p>{question?.content}</p>
        { renderInputs() } 
        { question?.lastQuestion ?
          <button onClick={() => handleSubmit({lastQuestion: true})}>
            Submit
          </button>
          : 
          <button onClick={() => handleSubmit({lastQuestion: false})}>
          Next
          </button>
        }
    </div>
  );
}

export default App;