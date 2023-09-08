---
title: Testing
---

# Testing

Learnify places a strong emphasis on testing to ensure the reliability and stability of its codebase. Unit tests and e2e are written using Jest and cypress and are executed during the development process.

## Unit Test

- **User Module**: Unit tests cover user authentication and stats-related functions.

- **Blog Module**: Tests verify the functionality of blog-related APIs.

- **Course Module**: Ensures the correctness of course-related APIs and integration with OpenAI.

- **Forum Module**: Tests validate the question-asking and replying functionality.

- **AI Service Module**: Unit tests verify the quiz generation, question-answer set generation, and the "Ask AI" service.

# End-to-End Testing

Learnify conducts end-to-end (E2E) testing to validate the entire system's functionality, with a focus on the Admin Panel. Cypress is the chosen E2E testing tool.

## Cypress Testing

- **Admin Panel**: E2E tests ensure the proper functioning of the Admin Panel, including user interactions and data integrity.

- **Mobile Application**: The mobile app is tested for end-to-end scenarios, including user journeys and interactions.

## CI/CD Integration

Learnify has integrated E2E testing into its CI/CD pipeline to catch issues early and maintain a high level of software quality.

For more information on running E2E tests and interpreting results, please continue reading.

These MDX files should serve as a starting point for your Learnify project documentation. You can further customize and expand upon them to provide comprehensive documentation for your final year project.
