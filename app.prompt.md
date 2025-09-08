### Objective 
The purpose of this assessment is to evaluate a candidate’s ability to: 
- Design and implement a small-scale system in Python or Node.js 
- Apply clean coding principles and structured problem-solving 
- Incorporate CI/CD automation using GitHub Actions (or equivalent) 
- Demonstrate documentation and testing practices 

### Common Technical Requirements 

## Languages & Frameworks 
- Use Node.js (Express) 
- Code should follow best practices for readability, structure, and error handling 

## Persistence 
- Any reasonable choice is acceptable (e.g., SQLite, JSON file, in-memory store, or lightweight database) 
- Candidate must justify their selection 

## Testing 
- Provide basic unit tests for critical functionality 
- Tests should be runnable via a standard test runner (pytest, unittest, or jest) 

## CI/CD 
- Use GitHub Actions (or similar) to implement a CI/CD pipeline: 
  - Build: Install dependencies, lint code 
  - Test: Run unit tests automatically 
  - Deploy/Package: Provide a mechanism for packaging or deployment (e.g., Docker build, artifact creation, or mock deployment) 


## Documentation 
- Include a README.md with: 
  - Overview of the project 
  - Setup and execution instructions 
	- CI/CD explanation 
	- Description of design decisions
	

## Deliverables 
- Source code in a GitHub repository 
- .github/workflows/ with pipeline definition 
- At least one test file with meaningful coverage 

## Evaluation Criteria 
- Correctness: Meets functional requirements 
- Code Quality: Clean, modular, maintainable 
- Testing: Adequate and relevant test coverage 
- DevOps Practices: Working CI/CD pipeline 
- Documentation: Clear and professional 

### Use Cases 
## 1. Lottery System 
Problem: Design a lottery system with the following features: 
-	Entry Creation 
    -   Users can register by providing name, email, and registration timestamp 
    -	Prevent duplicate emails within the same month 
-	Winner Selection 
  -	On execution of a scheduled job (e.g., monthly), randomly select one winner 
  -	Only consider entries from the start of the current month until selection time 
  -	Persist winner details for audit 

-	Validation 
  - Handle cases with no valid participants or invalid input 


## 2. Polling/Voting System 
Problem: Build a simple polling system to allow voting on specific topics. 
-	Poll Creation 
  - Create a poll with a title, description, and multiple options 
-	Option Management 
  - Allow adding, updating, and removing poll options 
-	Voting 
  - Users submit votes for a given poll option 
  -	Restrict one vote per user/email per poll 
-	Results 
  - API to fetch poll results with vote counts 
-	Poll Closure 
  - Scheduled job automatically closes polls after expiration date 


## 3. Simple Expense Tracker 
Problem: Develop a lightweight system to log and summarize expenses. 
-	Expense Logging 
  - Users add expenses with amount, category, and date 
  -	Prevent invalid inputs (negative/zero amounts, missing categories) 
-	Expense Retrieval 
  - API to list all expenses 
-	Expense Deletion 
  - API to remove specific expenses 
-	Summary 
  - API to provide monthly totals grouped by category 
-	Automation 
  - Scheduled job generates a monthly summary report and stores it (e.g., file, DB, or log) 

### Bonus Points 
-	Dockerized application (Dockerfile + instructions) 
-	Secrets/config management (e.g., .env files, GitHub Secrets) 
-	Extensible design (support multiple winners, multi-month reports, or poll analytics) 
-	Logging and monitoring integration 
-	Architectural diagram (using miro , excalidraw etc) 
