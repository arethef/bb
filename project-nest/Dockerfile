FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 3333
CMD [ "npm", "run", "start:dev" ]