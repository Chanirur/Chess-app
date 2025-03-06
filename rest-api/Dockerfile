# Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install  

COPY . .
RUN npm run build 
COPY /src/templates ./dist/templates

# Running
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist  

EXPOSE 5000

CMD ["npm", "run", "start"]
