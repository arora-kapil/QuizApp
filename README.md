# Trivia Quiz App
This is a React Native Trivia Quiz App that fetches quiz questions from the Open Trivia Database (OpenTDB). Users can select a category and difficulty level to start the quiz. At the end of each quiz, the user's score is saved, and they can view the leaderboard to compare their scores with others.

## Features
* Category and Difficulty Selection: Users can select from various quiz categories and choose a difficulty level (easy, medium, hard).
* Randomized Questions: Each quiz consists of 10 randomly selected multiple-choice questions.
* Score Submission: After completing the quiz, users can submit their score along with their username.
* Leaderboard: The app displays the top 10 scores for each category and difficulty.
* Responsive UI: The app is designed to be visually appealing with a clean, user-friendly interface.

## Screenshots

<img src="https://github.com/user-attachments/assets/1da64f42-c474-4d55-bfbe-a81ab03639f0" width=250 height=450>
<img src="https://github.com/user-attachments/assets/d85fbb2e-8aa6-4cdf-baa5-7d2994fe55c2" width=250 height=450>
<img src="https://github.com/user-attachments/assets/56e9f867-912a-440c-b900-2fc30e4bc3fc" width=250 height=450>
<img src="https://github.com/user-attachments/assets/3b7bcb82-ba64-4a9f-beb8-b10675ef087c" width=250 height=450>
<img src="https://github.com/user-attachments/assets/37ad887a-fa90-4ba4-a314-5c2a5c7966e1" width=250 height=450>


## Tech Stack
### Frontend:
* React Native: For building the mobile interface.
* Axios: To handle API requests to OpenTDB and the backend.
* React Native Picker: For category and difficulty selection.
* React Native Components: Button, Text, TextInput, etc.

### Backend:
* Node.js & Express: For handling API requests.
* MySQL (with Sequelize): To store and retrieve scores and leaderboard data.
* Open Trivia Database (OpenTDB): For fetching quiz questions.


## How It Works
### App Structure:
#### Quiz Setup Screen:

* Users select a quiz category and difficulty.
* Enter a username before starting the quiz.
* Options to either start the quiz or view the leaderboard.


#### Quiz Screen:
* Displays a multiple-choice question with randomized answer order.
* Updates the score after each question.
* After answering all questions, the app calculates the final score.

#### Score Submission:
* At the end of the quiz, the app sends the user's score, category, and difficulty to the backend.
* The score is saved in the MySQL database.


#### Leaderboard:
* Displays the top 10 scores for the selected category and difficulty.
* Users can view the leaderboard before starting a quiz.


## API Endpoints
* GET /categories: Fetches all available quiz categories from OpenTDB.
* GET /quiz: Fetches 10 quiz questions based on selected category and difficulty.
* POST /save-score: Submits the user's quiz score to the backend.
* GET /leaderboard: Fetches the leaderboard for a specific category and difficulty.

## Installation & Setup
### Prerequisites
* Node.js and npm installed on your machine.
* MySQL server for database setup.


### Backend Setup
* Clone the repository.
* Navigate to the backend directory and install dependencies: <br>
cd backend <br>
npm install
* Create a .env file with your MySQL credentials: <br>
DB_NAME=your_database_name <br>
DB_USER=your_mysql_username <br>
DB_PASSWORD=your_mysql_password <br>
DB_HOST=localhost <br>
PORT=5000
* Start the server: <br>
npm start


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
