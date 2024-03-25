# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies for the application
RUN npm install

# Copy the rest of the application code into the container
COPY . /app

RUN npx prisma generate


# Expose the port that the application listens on
EXPOSE 4001

# Start the application
CMD [ "npm", "run", "start" ]