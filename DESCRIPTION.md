# Approach

Build a focused Vue 3 loan repayment calculator using the supplied JavaScript, Tailwind, PMT utility and test tooling.

Keep the solution intentionally small:
- local state for calculator inputs and API state
- computed values for derived state and repayments
- finance calculation isolated from the UI for testing
- responsive and accessible UI based on the supplied fat-marker reference

# Task breakdown

- [x] Verify starter project and required Node/npm versions
- [x] Confirm API contracts and supplied PMT behaviour
- [x] Verify baseline Vitest, ESLint, production build and Cypress
- [x] Implement and test repayment calculation
- [x] Load loan purpose, repayment period and term options
- [x] Implement calculator state and loan amount validation
- [x] Build responsive calculator UI
- [x] Add loading, API error and retry states
- [x] Add Cypress coverage for key user flows
- [x] Complete accessibility and responsive QA
- [ ] Run final lint, tests, build and manual QA

# Key decisions

- Keep the supplied JavaScript stack rather than introducing unrelated tooling changes.
- Keep calculator state local because it belongs to this self-contained feature.
- Use the supplied PMT utility and keep repayment calculation separate from rendering.
- Use native form controls and Tailwind rather than adding additional form/UI libraries.

# Calculation

For the supplied reference case:

- Loan amount: $30,000
- Annual rate: 10%
- Repayment period: monthly
- Term: 24 months
- Periodic repayment: $1,384
- Total repayments: $33,216

The total is derived from the rounded periodic repayment to match the supplied fat-marker reference.

# QA

Baseline before implementation:
- Vitest: passing
- ESLint: passing
- Production build: passing
- Cypress: passing
- Backend/API: verified locally

Final QA and test results will be recorded here before submission.
