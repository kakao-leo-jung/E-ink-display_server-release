FROM node:10

# make app directory
WORKDIR /app

# app depencency install
COPY package*.json ./
RUN npm install

# add app source
COPY . .

CMD ["npm", "start"]