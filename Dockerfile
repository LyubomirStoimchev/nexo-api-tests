FROM node:22

WORKDIR /usr/tests

COPY package*.json ./

RUN npm ci 

COPY . .

CMD npm test