A Node Based TypeScript boiler plate codebase for large scale application and micro-services based projects.
This project setup has following features.

* Docker Setup using Docker compose
* Unit Testing using Jest Framework
* Multilanguage support using i18n packages
* Input validation using express validator
* Service based architecture followed
* Logging used with Winston package
* API documentation using with Swagger
* Linting using with ESLint
* Code Formatting using with Prettier
* Prisma ORM used

### Install dependancies 

`npm install`

### ENV setup

`cp .env.sample .env`

### Run the app

`npm run dev`

### Take the Build

`npm run build`

### Unit Tesing

`npm run test`


### Docker Setup

`docker compose up -d --build`

make sure your DB connections allowed from container, The localhost in the ENV won't work if you trying from docker without allowing mysql configuration to access your DB remotely

### Prisma ORM

`npm run prisma:generate`

`npm run prisma:migrate`

### Swagger URL

`http://localhost:PORT/api-docs`

