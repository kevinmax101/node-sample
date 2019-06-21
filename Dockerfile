FROM node:8.16-alpine

WORKDIR /usr/src/app
EXPOSE 8080

# :: install app dependencies
COPY package*.json ./
RUN npm install

# :: copy the rest of the source
COPY . .

# :: container default command
CMD ["node", "server.js"]
