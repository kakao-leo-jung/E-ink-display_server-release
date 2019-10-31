FROM node:10

# make app directory
WORKDIR /app

# app depencency install
COPY package*.json ./
RUN npm install
RUN npm install apidoc -g

# add app source
COPY . .

# update apidoc
RUN apidoc -i routes/ -o docs/

CMD ["npm", "start"]