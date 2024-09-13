import { Question, QuestionType } from '../shared-types';

// postMVP:
// The backend will retrieve the questions from the 'question' database table
// The keys of the following objects will be column names in the database

const mockResponse : Question[] = [
    {
        questionId: 1,
        title: 'Question 2',
        content: 'What residential work are you doing?',
        questionType: QuestionType.MULTIPLE_CHOICE_UNIQUE_ANSWER,
        options: ['Interior work', 'Exterior work'],
    },
    {
        questionId: 2,
        title: 'Question 2',
        content: 'What interior work are you doing?',
        questionType: QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS,
        options: ['Bathroom remodel', 'New bathroom', 'New laundry room', 'Other']
    },
    {
        questionId: 3,
        title: 'Question 3',
        content: 'What exterior work are you doing?',
        questionType: QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS,
        options: ['Garage door replacement', 'Exterior doors', 'Fencing', 'Other']
    },
]

export default mockResponse