import { Question, QuestionType } from '../shared-types';

const mockResponse : Question[] = [
    {
        questionId: 1,
        title: 'Question 2',
        content: 'What is that name of your company?',
        questionType: QuestionType.text,
        lastQuestion: false
    },
    {
        questionId: 2,
        title: 'Question 1',
        content: 'What is the capital of France?',
        options: ['Paris', 'New York', 'Berlin', 'Madrid'],
        questionType: QuestionType.multipleChoiceUniqueAnswer,
        lastQuestion: false
    },
    {
        questionId: 3,
        title: 'Question 3',
        content: 'What sports do you practice?',
        options: ['Soccer', 'Basketball', 'Tennis', 'Swimming'],
        questionType: QuestionType.multipleChoiceMultipleAnswers,
        lastQuestion: true
    },
]

export default mockResponse