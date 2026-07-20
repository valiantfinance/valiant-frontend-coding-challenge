# Valiant Finance - Frontend Coding Challenge

## Analysis

- Read through the coding challenge and requirements
- Identify assumptions, risks, and any ambiguous requirements
- Understand the expected user experience and validation rules
- Identify dependencies and project constraints

## Solution

- Define the overall application architecture
- Plan the component hierarchy and reusable components
- Decide how state management should be structured
- Define the API integration approach
- Review Valiant Finance site and [Quote Form](https://get.valiant.finance/business-loans/) for design guidance
- Research natural language calculator patterns and UI inspiration, eg [here](https://tympanus.net/Tutorials/NaturalLanguageForm/)
- Consider usability, accessibility, and responsive behaviour
- Break the work into small, manageable tasks

## Project Setup

- Install project dependencies
- Run the project and verify the existing setup
- Review the project structure and coding conventions
- Confirm testing and linting tools are working

## Implementation

- Build the calculator layout
- Create reusable form components
- Integrate the API to populate loan options
- Implement state management
- Add validation and input formatting
- Implement repayment calculation logic
- Connect the UI to application state
- Apply responsive styling and accessibility improvements
- Refactor where appropriate

## Error Handling

- Handle API failures gracefully
- Display clear validation messages
- Ensure invalid input cannot produce incorrect calculations
- Provide appropriate loading and error states

## Testing & QA

- Create unit tests for utility functions and business logic
- Create end-to-end tests covering the main user journey
- Manually test happy paths and validation scenarios
- Verify responsive behaviour
- Review the implementation for code quality, consistency, and edge cases

## Review

- Refactor for readability and maintainability
- Review accessibility and responsive behaviour
- Perform a final code review before submission
- Verify challenge requirements have been completed
- Final run linting, unit and end-to-end tests

## Quality Gates

- No duplicated business logic
- Components have a single responsibility
- State has a single source of truth
- All API failures are handled gracefully
- Core business logic is unit tested
- User interactions are covered by E2E tests
