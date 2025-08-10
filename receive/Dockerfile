ARG NODE_VERSION=22.18.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
EXPOSE 3000

COPY ./package.json ./package-lock.json ./

FROM base as dev
RUN npm ci --include=dev
COPY . .
CMD npm run start:dev

FROM base as prod
RUN npm ci --omit=dev
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
