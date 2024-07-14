FROM node:14

# Create app directory
WORKDIR /var/www/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]