FROM docker.io/library/node:23-alpine AS build

WORKDIR /app

COPY . .
COPY ./.env.sample .env
RUN npm install
RUN npm run build

FROM docker.io/library/node:23-alpine AS production

EXPOSE 8888

WORKDIR /app

COPY package.json ./
COPY ./.env.sample .env
COPY package-lock.json ./
COPY --from=build /app ./

CMD ["npm", "run", "dev"]