export type Question = {
    content: string
    options?: string[]
    questionType: QuestionType
    questionId: number
}

export enum QuestionType {
    MULTIPLE_CHOICE_UNIQUE_ANSWER = 'multiple_choice_unique_answer',
    MULTIPLE_CHOICE_MULTIPLE_ANSWERS = 'multiple_choice_multiple_answers',
    TEXT = 'text'
}

export type AllUserAnswers = {
    [questionId: number]: string[]
}

export enum FetchStatus {
    LOADING = 'loading',
    READY = 'ready',
    OUTCOME = 'outcome'
}

export enum Outcome {
    IHR = 'in-house-review',
    OTC = 'over-the-counter',
    NPR = 'no-permit-required'
}