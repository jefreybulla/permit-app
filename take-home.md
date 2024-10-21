# **Challenge**

A contractor has a residential job in San Francisco. By answering the questionnaire below, PermitFlow can help the contractor determine if a permit is needed and the application process. 

Below is an example simplified residential workflow (adapted from [https://sfdbi.org/](https://www.google.com/url?q=https://sfdbi.org/&sa=D&source=editors&ust=1709576701929470&usg=AOvVaw13boQ0-KULK1nTjVfJ75ZK)).

## Questionnaire

1. What residential work are you doing? *(Note: a user can only select a single option).*

1. Interior work
2. Exterior work

<aside>
🔀 Question Transition Logic

1. If `Interior work` is selected, then jump to `Question #2 - Interior Work` 
2. If `Exterior work` is selected, then jump to `Question #3 - Exterior Work`
</aside>

1. What interior work are you doing? *(Note: a user can select multiple options)*
    1. Bathroom remodel
    2. New bathroom
    3. New laundry room
    4. Other

<aside>
🔀 Question Transition Logic:

1. End questionnaire

Requirements Logic:

1. If (only) `bathroom remodel` is selected, then `Over-the-Counter Submission Process` is required. 
2. Else, `In-House Review Process` is required.
</aside>

1. What exterior work are you doing? *Note: a user can select multiple options)*
    1. Garage door replacement
    2. Exterior doors
    3. Fencing
    4. Other

<aside>
🔀 Question Transition Logic:

1. End questionnaire

Requirements Logic:

1. *If `Other` is selected, then `In-house Review Process` is required.*
2. Else if `Garage door replacement` and `Exterior doors` is selected*, then `OTC Submission Process` is required.*  
3. Else,  `No Permit` is required. 
</aside>

## Permit Requirements

Given the input above, display the output below as stated and no additional work is required other than rendering the text here. Note that only 1 scenario is possible and below is in order of priority.  E.g. if In-House Review Process & OTC Submission Process is required, then we require In-House Review only.

<aside>
✅ **In-House Review Process**

- A building permit is required.
- Include plan sets.
- Submit application for in-house review.
</aside>

<aside>
✅ **Over-the-Counter Submission Process**

- A building permit is required.
- Submit application for OTC review.
</aside>

<aside>
❌ **No Permit**

- Nothing is required! You’re set to build.
</aside>

## Out of Scope

You do not need to address the following:

- Ability to differentiate submissions by user
- Authentication