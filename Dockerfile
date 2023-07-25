# Use the Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if you're using npm) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which the NestJS application will run
EXPOSE 3000

# Command to start the application
CMD [ "npm", "run", "start:prod" ]