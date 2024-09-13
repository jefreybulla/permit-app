export default function nextQuestion(questionId : number, userAnswer? : string[]){
    switch(questionId){
        case 1:
            if(userAnswer && userAnswer.includes('Interior work')){
                saveAnswers(questionId, userAnswer)
                return 2
            }
            if(userAnswer && userAnswer.includes('Exterior work')){
                return 3
            }
        case 2:
            return -1
        case 3:
            return -1
        default:
            throw new Error('Invalid questionId')
    }
}

const answers = new Map<number, string[]>()
function saveAnswers(questionId : number, userAnswer : string[]){
    answers.set(questionId, userAnswer)
    console.log('answers ->')
    console.log(answers)
    console.log('-> end of answers')
}
