# Overview

This application is is an example using backend Node JS framework NestJS and Frontend in React with TailwindCSS.

The backend applocation is a modular based on MVC pattern, it integrates to Postgres Database using library Typeorm. It also has documentation with Swagger integration.
We can easily do TDD creating jest based unit tests files and automate its suite execution with command:

npm run test

The frontend is a React application built with Vite. It provides rapid building and configuration tools.
The application UI style was based on Tailwind CSS which brings a flexible and productive development.
State management is applied with RTK (Reduxc Tool Kit).

Any comments, questions or suggestion please, contact: vinicius.global@gmail.com

# KK API

Nest JS framework based application1

# Requirements

Docker
Node 17.x
POstgres Database

# Backend

# Database

1. It is required to have a Postgres database
2. We can use docker container for local postgres databse:

Ex:
docker run -d --name test-postgres -p 5432:5432 -e POSTGRES_PASSWORD=admin123 postgres

# Docker

- It was implemented a docker file where we can use for docker container support deployment: Kubernates cluster, AWS Fargate, etc.

# Build

npm install

# Run

npm run start

# Run in debug mode

npm run start:debug

# Run Unit Tests

npm run test

# Deployment

# Local

# Edit configuration file with DB and Encryption details

1. truenorth-api/configuration/local.env
2. Variables

DB_HOST=""
DB_PORT=5432
DB_USER="postgres"
DB_PASSWORD=""
DB_DATABASE=""
MODE="DEV"
RUN_MIGRATIONS=false
SYNCHRONIZE=true
PORT=5001
NODE_ENV="local"
SECRET_KEY=""
SECRET_IV=""

# Production

1. Create .env file on project root (truenorth-api)
2. Set configuration variables

DB_HOST=""
DB_PORT=5432
DB_USER="postgres"
DB_PASSWORD=""
DB_DATABASE=""
MODE="DEV"
RUN_MIGRATIONS=false
SYNCHRONIZE=true
PORT=5001
NODE_ENV="local"
SECRET_KEY=""
SECRET_IV=""

3. Build (production mode)

a) Export NODE_ENV variable equals to production
export NODE_ENV=production

b) Build command
npm run build

c) Set AWS Creds details environment variables:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION

d) Run Serverless script

# Verify API on console and access it

# Frontend

# Configuration

a) create .env file
b) Configure it

VITE_TN_API=http://localhost:5001
VITE_REDUX_SECRET_KEY=
VITE_SECRET_KEY=
VITE_SECRET_IV=

c) Build and run

# Local

npm install
npm run dev

# Production

npm install
npm run prodBuild

# Files would be built on folder "dist"
