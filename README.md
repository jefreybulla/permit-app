# Permit-app
A contractor has a residential job in San Francisco. By answering a questionnaire, Permit-app can help the contractor determine if a permit is needed and the application process.

This implementation is an front-end only MVP built with extensibility in mind. 

## Codebase intro video
https://www.loom.com/share/74b14612779747bab14c193b05c54f4d?sid=a8fe06da-4d31-4e19-88ac-eb9e8f6bd3ce

## Serve the build (easiest way to run the project)
I've included a build to the repo so you can easily run the app 
```
cd dist/apps/permit-app
npx lite-server
```
In your browser navigate to http://localhost:3000/ to use the app. 

## Key files
- `mock-questions.ts`: questions storage.
- `next-question.ts`: function that determines what question comes next.
- `determine-outcome.ts`: function to determine the outcome (requirements) logic based on user answers.
- `mock-api.ts`: function to fetch questions and save user answers.
- `app.tsx`: Main React component that renders the UI.

## MVP Extensibility
- Add questions to the questionaire:
	- Add as many quesiton as you need by adding more objects to `mock-questions,ts`.
    - You can also add a question of type Text to include questions such as 'What's your name?'
- Add/Update question transition logic:
    - Add any custom transition logic for new or existing questions by adding new cases to `next-question.ts`.
- Add/update outcome (requirements) logic:
    - Add any custom outcome logic for new or existing questions by adding new conditionals to `determine-outcome.ts`

## Ways to improve app/codebase if given more time
- Add/improve error handling.
- Add tests.
- Handle logic currently in folder `mock-server` in a backend.
- Add contact info questions (what's your name, email, etc).
- Persist user outcomes and user's contact info in a database.
- Create UI, APIs and db tables that allows a person/system to create any custom question/outcome logic.

## Setup for development
### Requirements
- Install [nvm](https://github.com/nvm-sh/nvm)
- Install Node version specified in `.nvmrc` by running `nvm install`
- Install dependencies with `npm install`

### Start the application
Run the app with
```
npx nx serve permit-app
```
In your browser navigate to http://localhost:4200/

### Build for production
Run `npx nx build permit-app` to build the application. The build artifacts are stored in the output directory (`dist/`), ready to be deployed.

### Regarding the initial setup
This project was initialized using the following [Nx](https://nx.dev) command
```
npx create-nx-workspace@latest permit-app --preset=react-monorepo
```
If you need to add a Express backend as an additional app to this monorepo you can use the following commands
```
nx add @nx/express
nx g @nx/express:app permit-api --directory=apps/permit-api
```
