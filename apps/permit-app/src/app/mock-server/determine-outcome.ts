import { AllUserAnswers, Outcome } from '../shared-types'

export default function determineOutcome(allUserAnswers : AllUserAnswers){
    /*
    Use a condition in allUserAmswers[questionId] to determine the outcome
    Example: to add a new outcome based on the answer to question 4, add allUserAnswers[4] to the conditional logic.
    */
    const outcomeArray = []
    if(allUserAnswers[2]){
        if(allUserAnswers[2].includes('Bathroom remodel') && allUserAnswers[2].length == 1){
            outcomeArray.push(Outcome.OTC)
        }
        else{
            outcomeArray.push(Outcome.IHR)
        }
    }
    if(allUserAnswers[3]){
        if(allUserAnswers[3].includes('Other')){
            outcomeArray.push(Outcome.IHR)
        }
        else if(allUserAnswers[3].includes('Garage door replacement') && allUserAnswers[3].includes('Exterior doors')){
            outcomeArray.push(Outcome.OTC)
        }
        else{
            outcomeArray.push(Outcome.NPR)
        }
    }

    /* 
    Note that only one outcome can be returned. 
    The following conditional logic represents the priority of the outcomes.
    If needed, the current implementation support cases such as doing interior work and exterior work at the same time.
    */
    if(outcomeArray.includes(Outcome.IHR)){
        return Outcome.IHR
    }
    else if(outcomeArray.includes(Outcome.OTC)){
        return Outcome.OTC
    }
    else{
        return Outcome.NPR
    }
}