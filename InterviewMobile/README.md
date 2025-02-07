# Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Start the development server:

  ```sh
  npm start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

# Goal

The goal of this exercise is to test your knowledge of the Typescript **type system**, have an idea of your understanding of the **native code's structure** (iOS and android directories).
And most importantly your sense of **system design**
This exercise is meant to test your **problem solving** abilities, more than your knowledge of a specific library

# Task

- There has been an error introduced prevents the app from running
  - [-] Fix the issue preferably without using expo CNG, to make the app run
  - [-] Expo is clever and can make the app run again without fixing the issue in the native code. We want you to fix it regardless

- We have a concept for handling consents for a patient and we want to expand that concept to the user as well
  - [-]  You are tasked with adding types to the `api.ts` file, such that the data passed in and the data returned is typed correctly
  - [-]  You should implement the logic for saving the consents

  - Patient Profile screen
    - [-] Implement the logic to save the patient's consents (you can find the function `saveAgreedPatientConsents` as a starting point), feel free to add functionalities to the `api.ts` file or expanding/creating types in the `patient-consent.ts` file

  - Settings screen
    - [-] If no consents have been answered for the user, present view to agree / disagree for each consents
    - [-] Show the consents for the user
    - [-] Add the option to edit the consents' agreements

---
Most of the components and functionalities are already implemented, it is up to you to refactor and adjust the code to meet up the requirements
With the current implementation, a reload of the app is needed on first launch in order to see the data. This doesn't need to be fixed

## Resources
- [React Navigation documentation](https://reactnavigation.org/)
- [Expo documentation](https://docs.expo.dev/)

---

Demo assets are from [lucide.dev](https://lucide.dev/)
