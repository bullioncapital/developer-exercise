FROM node:13.12.0-alpine3.11
COPY package.json .
RUN npm install
ADD . ./
EXPOSE 8080
CMD [ "yarn", "run", "start" ]
