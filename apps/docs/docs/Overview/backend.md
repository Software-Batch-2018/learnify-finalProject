---
title: Backend
---

# Backend

Learnify's backend is powered by Nest.js and uses PostgreSQL as the database system. It forms the core of the Learnify platform, handling user authentication, content storage, and AI-related services.

## Modules

The backend is divided into several modules:

- **User Module**: Responsible for user authentication and user statistics APIs using JWT authentication.

- **Blog Module**: Provides APIs for managing and retrieving educational blogs.

- **Course Module**: Manages course-related APIs, including adding, editing, and removing courses. Integrates with OpenAI for quiz and question-answer generation.

- **Forum Module**: Offers endpoints for asking and replying to questions in the discussion forum.

- **AI Service Module**: Exposes APIs for generating quizzes, question-answer sets for courses, and the "Ask AI" service.

## Database

Learnify uses PostgreSQL as its database system for secure and efficient data storage.

For detailed instructions on setting up and configuring the backend, please continue reading.
