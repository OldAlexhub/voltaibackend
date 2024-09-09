# Use an official Node.js image as the base
FROM node:18

# Install R
RUN apt-get update && apt-get install -y r-base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
