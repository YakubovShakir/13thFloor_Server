# Use the Alpine-based Node.js 22 image
FROM node:22-alpine

# Install python3 and build tools using apk
RUN apk update && apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    && rm -rf /var/cache/apk/*

# Set Python for node-gyp
ENV PYTHON=/usr/bin/python3
# Set working directory
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Command to run the application
CMD ["npm", "start"]