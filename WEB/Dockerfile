FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 8082

CMD ["node", "."]