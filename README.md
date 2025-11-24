# Cypress QA Automation POC

## 🚀 Project Overview
This project serves as a **Proof of Concept (POC)** demonstrating advanced QA Automation capabilities using **Cypress**. It showcases a comprehensive test automation framework designed to validate web applications, APIs, and database integrations, mirroring enterprise-grade standards.

The goal is to demonstrate proficiency in modern test automation tools, design patterns, and best practices.

## 🛠️ Tech Stack & Tools
*   **Core Framework**: [Cypress](https://www.cypress.io/) (E2E & Component Testing)
*   **Language**: JavaScript / TypeScript
*   **Database**: SQLite (for data-driven testing and seeding)
*   **API Testing**: Native Cypress HTTP requests
*   **Data Generation**: [Faker.js](https://fakerjs.dev/)
*   **Accessibility**: [cypress-axe](https://github.com/component-driven/cypress-axe)
*   **Reporting**: Cypress Dashboard / Local Reports

## 📂 Key Features Implemented

### 1. UI End-to-End Testing
*   Automated flows for **SauceDemo** (Login, Inventory, Cart, Checkout).
*   **Page Object Model (POM)** design pattern for maintainable and reusable code.
*   Handling of dynamic elements and complex user interactions.

### 2. API Testing Integration
*   Comprehensive REST API testing against **SWAPI** (Star Wars API).
*   Validation of status codes, response bodies, headers, and schemas.
*   Advanced scenarios: Pagination handling, Search queries, and Negative testing.

### 3. Database Testing
*   Direct integration with **SQLite** to validate backend state.
*   **Data-Driven Testing**: Iterating through database records to drive UI tests.
*   **Seeding**: Automated database setup and teardown scripts (`scripts/seed_db.js`).

### 4. Advanced Patterns
*   **Custom Commands**: Encapsulated logic for repetitive actions (e.g., `cy.login()`, `cy.queryDb()`).
*   **Accessibility Testing**: Automated WCAG compliance checks using `cypress-axe`.
*   **Visual Regression**: Setup for pixel-perfect UI validation.
*   **Performance**: Basic response time assertions for API endpoints.

## ⚡️ Getting Started

### Prerequisites
*   Node.js (v14 or higher)
*   npm

### Installation
```bash
npm install
```

### Database Setup
Initialize the local SQLite database with test data:
```bash
node scripts/seed_db.js
```

### Running Tests
**Interactive Mode (Test Runner):**
```bash
npx cypress open
```

**Headless Mode (CI/CD):**
```bash
npx cypress run
```

## 🏗️ Project Structure
```
├── cypress/
│   ├── e2e/
│   │   ├── backend/      # API & Database Tests
│   │   ├── frontend/     # UI E2E Tests (SauceDemo)
│   │   └── ...
│   ├── pages/            # Page Object Models
│   ├── support/          # Custom Commands & Config
│   └── fixtures/         # Static Test Data
├── scripts/              # Utility scripts (DB seeding)
├── cypress.config.ts     # Main Configuration
└── package.json
```

## 🤝 Contribution
This project is a demonstration of personal knowledge and technical skills in QA Automation. Feel free to explore the code to understand the implementation details of various testing patterns.
