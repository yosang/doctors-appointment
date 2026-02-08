# Project

This application is developed around the idea of a ticket system for **Patients** and a **Receptionist/s**.

This project was part of an assignment from [Noroff backend second year](https://github.com/noroff-backend-2) and was extended with some extra features. Here I delved deeper into using [Keycloack](https://www.keycloak.org/) for auth and implemented a basic SQLite database configuration with sequelize.

# Installation

**Prerequisites**

- Node 22.x.x
- NPM version 10.x.x

# Configuration

1. Clone the project with `git clone https://github.com/yosang/doctors-appointment`
2. While on the root folder, do `npm install` to install all dependencies needed for this project.
3. Add `.env` file to each individual service.

# Usage

1. `npm run start` - Starts the application.
2. Visit the receptionist page at http://localhost:8000/receptionist
3. Visit the patients page at http://localhost:8000/patients

# Environment Variables

...

# WebSocket Server

This is a Node.js WebSocket server running with the [ws](https://npm.im/ws) package.

# Author

[Yosmel Chiang](https://github.com/yosang)
