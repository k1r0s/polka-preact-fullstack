# Use a Node.js image to build the frontend assets
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the frontend assets
RUN npm run build

# Use a smaller Node.js image to serve the static files
FROM node:18-alpine

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

# Command to serve the static files
CMD ["serve", "-s", "dist", "-l", "80"]
