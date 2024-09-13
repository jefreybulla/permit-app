import { AllUserAnswers, Outcome } from '../shared-types'

export default function determineOutcome(allUserAnswers : AllUserAnswers){
    const outcomeArray = []
    if(allUserAnswers[2]){
        if(allUserAnswers[2].includes('Bathroom remodel') && allUserAnswers[2].length == 1){
            //return 'Over-the-Counter Submission Process'
            outcomeArray.push(Outcome.OTC)
        }
        else{
            //return 'In-House Review Process'
            outcomeArray.push(Outcome.IHR)
        }
    }
    if(allUserAnswers[3]){
        if(allUserAnswers[3].includes('Other')){
            //return 'In-House Review Process'
            outcomeArray.push(Outcome.IHR)
        }
        else if(allUserAnswers[3].includes('Garage door replacement') && allUserAnswers[3].includes('Exterior doors')){
            //return 'Over-the-Counter Submission Process'
            outcomeArray.push(Outcome.OTC)
        }
        else{
            //return 'No permit required'
            outcomeArray.push(Outcome.NPR)
        }
    }

    /* 
    the current use case does not require the logic below
    but if the business/product requirements change, the following logic can be useful
    for other use cases such as doing interior work and exterior work at the same time
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