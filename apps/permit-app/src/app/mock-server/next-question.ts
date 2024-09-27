export default function nextQuestion(questionId : number, userAnswer : string[]){
    switch(questionId){
        /* 
        Each 'case <questionId>' defines the question transition logic.
        Return the desired next questionId based on business logic.
        Return -1 if there are no more questions.
        */
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


/* APIs to support a Post-MVP form builder

Option 1
POST transition/:origin_question
body: {
    logic: "if...{ ..}"
}

Option 2
POST transition
body: {
    origin: 1 <number>
    conditional: "IF_INCLUDES" <enum>
    condition: "interior work" <string>
    destination: 2  <number>
}

Option 3
POST transition_conditions
body: {
    conditionsArray: [
        {
            conditional_operator: "IF_INCLUDES" <enum>
            condition: "interior work" <string> 
        },
        {
            conditional_operator: "IF_INCLUDES" <enum>
            condition: "general work" <string> 
        },
        logical_operators?: ['OR'],
        origin: 1 <number>
        destination: 2  <number>
    ]
}

*/

