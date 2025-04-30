# Frontend Dockerfile
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy frontend package files
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY ./ .

# Expose the frontend Vite dev server port
EXPOSE 5173

# Default command
CMD ["npm", "run", "dev", "--", "--host"]
