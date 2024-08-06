# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Serve the application using serve package.
# Install serve globally.
RUN npm install -g serve

# Set the command to run your app using serve.
CMD ["serve", "-s", "build"]

# Expose port 5000.
EXPOSE 5000
