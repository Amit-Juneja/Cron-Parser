# Cron Parser Project

This project provides a cron parser implemented in TypeScript, designed to parse and format cron expressions. It supports different types of patterns including commas, ranges, stars, and increments. The project also includes comprehensive tests to ensure correct functionality.

## Project Structure

- `src/`: Contains the TypeScript source code.
  - `parsers/`: Includes the various pattern parsers (comma, range, star, increment).
  - `utils/`: Utility functions used across the project.
- `tests/`: Contains the Jest test cases for the parser.
- `README.md`: Documentation for the project.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Project metadata and dependencies.

## Design Pattern

### Strategy Pattern

This project utilizes the **Strategy Pattern**. Each type of cron pattern (comma, range, star, increment) is handled by a separate parser module, implementing a consistent interface (`isMatched` and `doParser`). The main parser class (`Parser`) dynamically selects the appropriate strategy based on the input pattern.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-repo/cron-parser-ts.git
cd cron-parser-ts
npm install
```

## Running the project

To run the project, you need to have Node.js and npm installed on your machine. If not, follow the instructions [here](https://nodejs.org/en) to install them.


## Running the Cron Parser

To run the cron parser with a custom cron expression, pass the expression as a command-line argument:

```bash
ts-node src/index.ts '*/15 0 1,5 * 1-5 /usr/bind/find'
```
This will output the parsed cron expression results.

## Running Tests

This project uses Jest for testing. To run the test suite:

```bash
npm test
```

## Deployment

This project does not have any specific deployment instructions as it is a library designed to be used as a dependency in other projects. However, if you need to package it, you can use npm's packaging features:

```bash
npm run build
npm publish
```

This will build the TypeScript code into JavaScript and publish the package to npm.

## Environment Setup

# Clean OS X/Linux Environment

If you're setting up this project on a clean OS X/Linux environment, follow these steps:

1. Install Node.js and npm: You can use a Node Version Manager (nvm) to install Node.js. This is recommended as it allows you to manage multiple versions of Node.js. This   project uses Node version 18.19.1

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install node
```

2. Clone the Repository: Use git to clone the repository.

```bash
git clone https://github.com/Amit-Juneja/Cron-Parser.git
cd Cron-Parser
```

3. Install Dependencies: Run npm install to install all required dependencies.

4. Run Tests: Ensure everything is working correctly by running the tests with npm test.
