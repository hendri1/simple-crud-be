FROM node:lts-alpine as build-image

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn clean
RUN yarn build

FROM node:lts-alpine as deploy

WORKDIR /app

COPY --from=build-image /app/node_modules ./node_modules
COPY --from=build-image /app/dist ./dist
COPY --from=build-image /app/src ./src
COPY --from=build-image /app/package.json ./package.json
COPY --from=build-image /app/tsconfig.json ./tsconfig.json

EXPOSE 8000
CMD [ "yarn", "start:prod" ]
