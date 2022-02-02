FROM node:latest as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 8000
CMD [ "node", "build/server.js" ]
