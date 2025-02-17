# Quiz App NCC

## Overview

The Quiz App NCC is an interactive exam preparation platform designed to help users practice through quizzes and mock tests. The application features user authentication, topic-based quizzes, and performance tracking via leaderboards.

## Tech Stack

- **Frontend**: React Native with TypeScript, Expo, and Expo Router
- **Backend/Database**: Supabase
- **UI Framework**: React Native Paper
- **Build Service**: EAS (Expo Application Services)

## Core Features

### 1. Authentication

- User registration and login functionality
- Email-based authentication system

### 2. Dashboard

- Profile management
- Access to quizzes and mock tests
- Leaderboard for tracking performance

### 3. Quiz System

- Multiple-choice questions with 4 options each
- Point system for correct answers
- Progress tracking with completion percentage

### 4. Mock Test Feature

- Comprehensive tests with a large question bank
- Structured evaluation system

### 5. Leaderboard System

- Ranking based on correct answers
- Multi-attempt performance tracking

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Expo CLI installed globally
  ```bash
  npm install -g expo-cli
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd QuizApp-NCC
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running the App

- Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal.
- Alternatively, you can run the app in an Android or iOS emulator.

## Deployment

To deploy your app using EAS:

1. Log in to your Expo account:
   ```bash
   eas login
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build your app:
   ```bash
   eas build --platform android
   ```

   or

   ```bash
   eas build --platform ios
   ```

4. Follow the prompts to complete the build process.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Expo team for providing a robust framework for building mobile applications.
- Special thanks to the NCC for their support and inspiration.
