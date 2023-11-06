# Base image
FROM node:16-alpine AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

COPY configuration dist/src/configuration

# Base image for production
FROM node:16-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG DB_SECRETS_ARN=''
ENV DB_SECRETS_ARN=${DB_SECRETS_ARN}

ARG VPC_NAME_SECRET=''
ENV VPC_NAME_SECRET=${VPC_NAME_SECRET}

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
# If you have a package-lock.json, speedier builds with 'npm ci', otherwise use 'npm install --only=production'
RUN npm install --only=production

# RUN npm run build

# Bundle app source
COPY . .

# Copy the bundled code
COPY --from=development /usr/src/app/dist ./dist

# Expose ports
EXPOSE 9000
EXPOSE 3000
EXPOSE 6000

# Start the server using the production build
CMD [ "node", "dist/src/main" ]