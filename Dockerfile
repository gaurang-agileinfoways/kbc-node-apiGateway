FROM node:current
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000