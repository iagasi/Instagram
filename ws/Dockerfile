FROM node:18.16.0-alpine as build



WORKDIR /app

COPY ./ws/package*.json .
COPY ./ws/tsconfig.json .

COPY ./ws/index.ts .
COPY ./ws/constants.ts .

COPY ./types ../types
COPY ./dto ../dto
COPY constants.ts ../

RUN  npm ci
RUN npm run compile







CMD ["node","./dist/app/index.js"]