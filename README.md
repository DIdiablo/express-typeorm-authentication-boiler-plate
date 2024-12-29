<h1 align="center">
  <br>
  <img src="https://github.com/ahmadjoya/typescript-express-mongoose-starter/blob/main/src/public/nodejs.png?raw=true" alt="Node.js Logo" width="400"/>
  <br>
  <br>
  Express TypeORM Authentication Boilerplate
  <br>
</h1>

<h4 align="center">🚀 Express RESTful API Boilerplate with TypeScript and TypeORM</h4>


<br />

## 🚀 Quick Start

### Step 1: Clone the repo

```bash
git clone https://github.com/ahmadjoya/express-typeorm-authentication-boiler-plate.git
cd express-typeorm-authentication-boiler-plate
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure Environment

Create a `.env` file in the root directory and add the following variables:

```env
# PORT
PORT = 3000

# DATABASE
DB_HOST = localhost
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = password
DB_DATABASE = dev

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs
```

## 🌟 Features

- **TypeScript** - Strongly typed language
- **TypeORM** - Modern database ORM for TypeScript and Node.js
- **PostgreSQL** - Powerful, open-source object-relational database
- **Express.js** - Fast, unopinionated, minimalist web framework
- **Authentication** - JWT based authentication
- **Authorization** - Role based access control
- **API Documentation** - Swagger UI
- **Testing** - Unit and integration tests using Jest
- **Validation** - Request data validation using class-validator
- **Logging** - Using winston and morgan
- **Security** - Helmet, cors, rate limiting
- **Docker Support** - Containerization
- **Linting** - ESLint and Prettier

## 🔧 Environment Variables

- **PORT=** 3000
- **DB_HOST=** localhost
- **DB_PORT=** 5432
- **DB_USER=** postgres
- **DB_PASSWORD=** password
- **DB_DATABASE=** dev
- **LOG_FORMAT=** dev
- **LOG_DIR=** ../logs
