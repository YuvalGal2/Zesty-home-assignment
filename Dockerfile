# Use the official Node.js 16.x runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY assets .

# Set the environment variable for the app's port
ENV PORT=3000

# Expose the app's port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
