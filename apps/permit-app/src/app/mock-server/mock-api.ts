import { AllUserAnswers, Question } from '../shared-types'
import nextQuestion from './next-question'
import mockResponse from './mock-response'
import determineOutcome from './determine-outcome'

type MockApiPostResponse = {
    nextQuestionId: number
    outcome?: string
}

export async function mockApiGet(questionNumber: number): Promise<Question> {
    const response = mockResponse.filter(question => question.questionId == questionNumber)[0]
    return response
}
/*
MVP: I used a variable at runtime to store the answers
PostMVP: If needed for business/product reasons, I would use the backend to persist the answers in the database
otherwise, we could use Redis to temporarily store the answers so we can determine the permit outcome
*/


const allUserAnswers = {} as AllUserAnswers

export async function mockApiPost(questionNumber: number, userAnswer: string[]): Promise<MockApiPostResponse> {
    allUserAnswers[questionNumber] = userAnswer
    console.log('answers ->')
    console.log(allUserAnswers)
    console.log('-> end of answers')
    const nextQuestionId = nextQuestion(questionNumber, userAnswer)
    if(nextQuestionId == -1){
        console.log('end of questions')
        return {
            nextQuestionId: -1,
            outcome: determineOutcome(allUserAnswers)
        }
    }
    return {
        nextQuestionId: nextQuestionId
    }
}