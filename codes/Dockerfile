FROM node:16

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
