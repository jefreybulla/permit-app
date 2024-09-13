import { Question, QuestionType } from '../shared-types';

/*
PostMVP:
The backend will retrieve the questions from the 'question' database table.
The keys of the object of type Question would be the column names in the database.
*/

const mockQuestions : Question[] = [
    {
        questionId: 1,
        content: 'What residential work are you doing?',
        questionType: QuestionType.MULTIPLE_CHOICE_UNIQUE_ANSWER,
        options: ['Interior work', 'Exterior work'],
    },
    {
        questionId: 2,
        content: 'What interior work are you doing?',
        questionType: QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS,
        options: ['Bathroom remodel', 'New bathroom', 'New laundry room', 'Other']
    },
    {
        questionId: 3,
        content: 'What exterior work are you doing?',
        questionType: QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS,
        options: ['Garage door replacement', 'Exterior doors', 'Fencing', 'Other']
    },
]

export default mockQuestions