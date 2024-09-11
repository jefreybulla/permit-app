import { Question } from '../shared-types'
import mockResponse from './mockResponse'

type MockApiPostResponse = {
    nextQuestionId: number
}

export async function mockApiGet(questionNumber: number): Promise<Question> {
    console.log('mockApiGet', questionNumber)
    const response = mockResponse.filter(question => question.questionId == questionNumber)[0]
    return response
}

const userResponses = new Map<number, string[]>() 

export async function mockApiPost(questionNumber: number, userAnswer: string[]): Promise<MockApiPostResponse> {
    //console.log('userAnswer ->')
    //console.log(userAnswer)
    userResponses.set(questionNumber, userAnswer)
    console.log('userResponses ->')
    console.log(userResponses)
    return {
        nextQuestionId: questionNumber + 1
    }
}