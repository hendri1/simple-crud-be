FROM node:latest as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 8000
CMD [ "node", "-r ts-node/regsiter/transpile-only", "-r tsconfig-paths/register", "dist/server.js" ]
