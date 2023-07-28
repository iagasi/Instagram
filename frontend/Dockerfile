FROM node:18-alpine AS build

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/frontend
COPY ./frontend .
COPY ./types ../types
COPY constants.ts ../
RUN  npm ci
RUN npm run build


FROM node:18-alpine
WORKDIR /app
COPY --from=build /usr/src/app/frontend/node_modules ./node_modules
COPY --from=build /usr/src/app/frontend/.next ./.next
COPY --from=build /usr/src/app/frontend/public ./public
COPY --from=build /usr/src/app/frontend/package*.json  .
CMD ["npm","start"]