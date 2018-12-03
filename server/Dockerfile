FROM node:alpine

RUN mkdir -p /srv/app/node-server
WORKDIR /srv/app/node-server

COPY package.json /srv/app/node-server
COPY yarn.lock /srv/app/node-server
RUN yarn install
COPY . /srv/app/node-server

CMD ["yarn", "start"]
