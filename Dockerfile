FROM node
WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

expose 8080

CMD ["npm", "start"]