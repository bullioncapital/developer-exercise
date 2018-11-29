FROM node:8

WORKDIR /usr/src/app

COPY . . 

RUN rm -rf node_modules && npm install

EXPOSE 8080

CMD [ "npm", "run", "prod" ]