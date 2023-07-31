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
  <img src="https://img.shields.io/badge/-Typeorm-3c356a?style=flat-square&logo=data:image/png;base64,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"/>
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
npm install react-image-color-picker
```

**Yarn**
```bash
yarn add react-image-color-picker
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