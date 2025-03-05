# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (better for caching layers)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 5000 (matching Next app)
EXPOSE 3000

# Start the Next development server

#Change in PROD 

CMD ["npm", "run", "dev"]
