# IKEA Lottery - Technical Assessment

Small Node.js (Express) application implementing the Lottery use case from the assessment.

Overview
- Users can register entries (name, email).
- Duplicate emails within the same month are prevented.
- A draw endpoint picks a random winner from entries in the current month and persists the winner.

Persistence
- SQLite used for simplicity and zero-ops local setup. It's file-based and sufficient for this test.

Run locally
- Install dependencies: npm ci
- Start: npm start

Tests
- Run: npm test

CI
- GitHub Actions workflow at `.github/workflows/ci.yml` runs install, tests and builds a Docker image.

Design notes
- Small modular service layer (`src/services/lottery`) separates business logic from HTTP routing.
- SQLite chosen for simplicity; extendable to Postgres by swapping DB layer.
