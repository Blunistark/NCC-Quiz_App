# Quiz App Documentation

## Overview

The Quiz App is a comprehensive exam preparation platform that enables users to practice through interactive quizzes. The application features user authentication, topic-based quizzes, mock tests, and performance tracking via leaderboards.

## Tech Stack

- Frontend: React Native with TypeScript, Expo, and Expo Router
- Backend/Database: Supabase
- UI Framework: React Native Paper
- AI Processing: DeepSeek

## Core Features

### 1. Authentication & Welcome Screen

- Clean, intuitive welcome interface
- User registration and login functionality
- Email-based authentication system

### 2. Dashboard

The main hub provides easy navigation to:

- Profile management
- Quiz section
- Leaderboard
- Mock test area

### 3. Profile Management

Users must complete their profile before accessing quizzes:

- Name
- Regimental Number
- Unit
- School/College
- Directorate
- Group

### 4. Quiz System

#### Structure

- **Common Subjects**: General topics
- **Specialized Subjects**: Field-specific content

#### Quiz Flow

- Topic selection from database
- Multiple-choice questions (4 options each)
- Point system for correct answers
- 5-second review period after each answer
- Progress tracking with completion percentage
- Back navigation option

### 5. Mock Test Feature

- Dedicated mock test section
- Comprehensive tests (500-600 questions)
- Separate question database
- Extended duration
- Structured evaluation system

### 6. Leaderboard System

- Ranking based on correct answers
- Separate rankings for:
  - Regular quizzes
  - Mock tests
- Multi-attempt performance tracking

## Technical Features

### User Interface

- Responsive design (mobile & desktop)
- Persistent navigation bar
  - Home
  - Quiz
  - Leaderboard
  - Mock Tests
  - Profile

### Backend Integration

- Secure user authentication
- Database management for:
  - Quiz topics
  - Question banks
  - User progress
  - Performance metrics
  - Leaderboard data

## Database Schema

### Users Table

- `id`: UUID (Primary Key)
- `name`: String
- `regimental_number`: String
- `unit`: String
- `school_college`: String
- `directorate`: String
- `group`: String
- `email`: String (Unique)
- `password_hash`: String

### Quizzes Table

- `id`: UUID (Primary Key)
- `title`: String
- `subject`: String
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Questions Table

- `id`: UUID (Primary Key)
- `quiz_id`: UUID (Foreign Key)
- `question_text`: String
- `option_a`: String
- `option_b`: String
- `option_c`: String
- `option_d`: String
- `correct_answer`: String

### Answers Table

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key)
- `question_id`: UUID (Foreign Key)
- `selected_option`: String
- `is_correct`: Boolean

### Leaderboard Table

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key)
- `quiz_id`: UUID (Foreign Key)
- `score`: Integer
- `attempt_date`: Timestamp

## Folder Structure

## Summary

The Quiz App serves as a robust exam preparation tool, offering structured learning through quizzes and mock tests. Its competitive elements and progress tracking features create an engaging learning environment while maintaining a user-friendly experience.

# Implementation Plan

## Phase 1: Project Setup & Authentication (Week 1)

1. Initialize project structure
   - Set up React Native with Expo and Expo Router ( use npx create-expo-app QuizApp-NCC -e with-router  )
   - Install necessary dependencies
   - Set up Supabase client

2. Implement Authentication
   - Create welcome screen
   - Build registration form
   - Implement login functionality
   - Set up email verification
   - Add authentication state management

## Phase 2: Profile & Navigation (Week 2)

1. Profile Management
   - Create profile form components
   - Implement profile validation
   - Set up profile data storage in Supabase
   - Add profile completion check

2. Navigation Structure
   - Set up Expo Router
   - Implement protected routes
   - Create navigation bar
   - Add basic screens structure

## Phase 3: Quiz System (Weeks 3-4)

1. Quiz Foundation
   - Create quiz selection interface
   - Implement question display component
   - Add multiple choice selection
   - Build timer functionality
   - Implement scoring system

2. Quiz Flow
   - Add topic selection
   - Implement question navigation
   - Create answer review system
   - Add progress tracking
   - Implement quiz completion logic

## Phase 4: Mock Tests (Week 5)

1. Mock Test System
   - Create separate mock test interface
   - Implement extended duration logic
   - Build comprehensive evaluation system
   - Add mock test specific database queries

## Phase 5: Leaderboard (Week 6)

1. Leaderboard System
   - Create leaderboard UI
   - Implement scoring algorithms
   - Add filtering options
   - Create performance tracking
   - Implement real-time updates

## Phase 6: Testing & Polish (Week 7)

1. Testing
   - Write unit tests
   - Perform integration testing
   - Conduct user acceptance testing
   - Debug and optimize

2. Final Polish
   - Optimize performance
   - Add loading states
   - Implement error handling
   - Add offline support
   - Final UI/UX improvements

## Development Priorities

1. **Must Have (Phase 1-3)**
   - User authentication
   - Profile management
   - Basic quiz functionality
   - Question/answer system

2. **Should Have (Phase 4-5)**
   - Mock tests
   - Leaderboard
   - Progress tracking
   - Performance metrics

3. **Nice to Have (Phase 6)**
   - Offline support
   - Advanced analytics
   - Social features
   - Custom themes

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up Supabase credentials
4. Start with Phase 1, Task 1

Each phase should be completed before moving to the next. Create separate branches for each feature and merge only when fully tested.
