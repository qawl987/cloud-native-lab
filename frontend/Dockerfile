FROM docker.io/library/node:23-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

FROM docker.io/library/node:23-alpine AS production

EXPOSE 5173

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY --from=build /app ./

CMD ["npm", "run", "dev", "--", "--host"]