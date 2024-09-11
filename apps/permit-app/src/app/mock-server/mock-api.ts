import { Question, QuestionType } from '../shared-types';

const mockResponse : Question = {
    title: 'Question 1',
    content: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    type: QuestionType.multipleChoiceUniqueAnswer,
    currentQuestionId: 1,
    lastQuestion: false
}

type mockApiParams = {
    questionNumber: number
}

export async function mockApiGet(mockApiParams: mockApiParams): Promise<Question> {
    console.log('mockApiParams', mockApiParams)
    return mockResponse
}