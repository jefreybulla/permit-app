export type Question = {
    title: string
    content: string
    options?: string[]
    questionType: QuestionType
    questionId: number
    lastQuestion: boolean
}

export enum QuestionType {
    multipleChoiceUniqueAnswer = 'multiple_choice_unique_answer',
    multipleChoiceMultipleAnswers = 'multiple_choice_multiple_answers',
    text = 'text'
}