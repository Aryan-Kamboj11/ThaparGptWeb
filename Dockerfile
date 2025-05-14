# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# 1. Copy ONLY package files first (optimizes caching)
COPY thapargpt-frontend/package.json .
COPY thapargpt-frontend/package-lock.json .

# 2. Install dependencies
RUN npm install

# 3. Copy all frontend files
COPY thapargpt-frontend/ .

# 4. Build the app
RUN npm run build

# 5. Install a lightweight web server
RUN npm install -g serve

# 6. Start the app
CMD ["serve", "-s", "build", "-l", "3000"]