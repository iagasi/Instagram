FROM node:18.16.0-alpine as build

# RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/backend

WORKDIR /usr/src/backend

COPY ./server/package*.json .
COPY ./server/tsconfig.json .
COPY ./server/.env .
COPY ./server/src ./src
COPY ./types ../types
COPY ./dto ../dto
COPY constants.ts ../
RUN  npm ci
RUN npm run compile


FROM node:18-alpine
WORKDIR /app
COPY --from=build /usr/src/backend/node_modules ./node_modules
COPY --from=build /usr/src/backend/dist ./dist


WORKDIR /app/dist/backend/src

CMD ["node","index.js"]