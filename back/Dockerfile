# Use the official Node.js image based on Alpine Linux
FROM node:18-alpine AS build

# Create and set the application directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install


COPY ./.babelrc /app/
COPY ./src /app/src

# Transpile code
RUN npm run build

# Use another Nodejs image to run the app once the code is transpiled
FROM node:18-alpine

WORKDIR /app

# Copy the application source code to the working directory
COPY --from=build /app /app

# Install only required dependencies
RUN npm i --omit=dev

# Expose the port that your application will run on
EXPOSE 80

# Define the command to run your application
CMD ["npm", "run", "prod"]
