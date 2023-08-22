# Use the Node.js 14 base image
FROM node:14

# Set the working directory inside the image
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code to the image
COPY . .

# Build the React app
RUN npm run build

# Set the runtime command to serve the built files
CMD ["npx", "serve", "-s", "build"]
