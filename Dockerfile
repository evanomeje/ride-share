FROM node:18-alpine AS simulation
WORKDIR /app

# Copy package files and config
COPY simulation/package*.json simulation/
COPY shared shared/
COPY dbconfig.json ./

# Install dependencies
RUN cd simulation && npm install

# Copy source code
COPY simulation simulation/

# Build the application
RUN cd simulation && npm run build

# Start the application
CMD ["node", "simulation/dist/index.js"] 