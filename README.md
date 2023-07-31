<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

# API for Brain Agriculture Test 🌾🚜

This API is designed to handle the registration and management of rural producers. It allows users to add, edit, and delete rural producers with various data points related to their farms. 

The development process was guided by the principles of Test-Driven Development (TDD), ensuring that each feature and functionality has a high test coverage. Additionally, the project was built following the Clean Architecture approach, prioritizing code quality and maintainability, resulting in a highly organized and scalable codebase.


## Main technologies
<p align="center">
  <img src="https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js"/>
  <img src="https://img.shields.io/badge/-TypeScript-032d5a?style=flat-square&logo=typescript"/>
  <img src="https://img.shields.io/badge/-Nestjs-c50234?style=flat-square&logo=nestjs" />
  <img src="https://img.shields.io/badge/-PostgreSQL-blue?style=flat-square&logo=postgreSQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Typeorm-3c356a?style=flat-square"/>
  <img src="https://img.shields.io/badge/-Jest-c50234?style=flat-square&logo=jest" />
  <img src="https://img.shields.io/badge/-GitFlow-black?style=flat-square&logo=git"/>
</p>

## Documentation

**Swagger docs:**

  The Swagger documentation can be found by running the project and accessing http://localhost:3000/docs/
  ![Entity Relationship Diagram](./static/swagger.png)


**Database ERD:**
  ![Entity Relationship Diagram](./static/erd.png)
## Requirements

- Node.js 
- Docker

## Install



**NPM**
```bash
npm install 
```

**Yarn**
```bash
yarn install
```



**2. Configure environment variables**
  - To run this project, you will need to add the following environment variables to your .env file

    - `POSTGRES_HOST=`
    - `POSTGRES_PORT=`
    - `POSTGRES_USER=`
    - `POSTGRES_PASSWORD=`
    - `POSTGRES_DB=`
    - `NODE_ENV=`
    - `API_AUTH=` <-- basic auth

**3. Build and run the docker**
  - this step can take a while until finish
```bash
  $ docker-compose up --build
```

### 🚀🚀🚀 Thats it!


## Author

⭐ Gustavo Mata [@gusttaswe](https://github.com/gusttaswe)
