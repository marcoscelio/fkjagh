# KK API

Nest JS framework based application1

# Requirements

Docker
Node 17.x

# Backend

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
