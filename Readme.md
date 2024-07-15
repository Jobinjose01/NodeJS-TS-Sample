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

