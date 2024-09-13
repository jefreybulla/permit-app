export default function nextQuestion(questionId : number, userAnswer : string[]){
    switch(questionId){
        // use 'case <questionId>' to define the logic for the next question
        // return -1 if there are no more questions
        case 1:
            if(userAnswer && userAnswer.includes('Interior work')){
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
