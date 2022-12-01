FROM node:18.2

WORKDIR /app

COPY package.json .

RUN npm install nodemon && npm install

COPY . .

EXPOSE 8900

CMD ["npm", "run", "dev"]