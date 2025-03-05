# 🚀 Stage 1: Build Step (Includes devDependencies)
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package.json package-lock.json ./
RUN npm install  

# Copy source files and build
COPY . .
RUN npm run build 

# Stage 2: Production Step (Only production dependencies)
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY package.json package-lock.json ./
RUN npm install --only=production  # ✅ Only install prod dependencies

# Copy the built dist folder from the previous stage
COPY --from=build /app/dist ./dist  

# Expose the app port
EXPOSE 5000

# Start the Express app
CMD ["npm", "run", "start"]
