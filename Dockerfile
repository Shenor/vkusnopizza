FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY . .

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "npm", "run", "start" ]
