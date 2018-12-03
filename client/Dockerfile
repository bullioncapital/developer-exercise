FROM node:alpine

RUN mkdir -p /srv/app/frontend
WORKDIR /srv/app/frontend

COPY package.json /srv/app/frontend
COPY yarn.lock /srv/app/frontend
RUN yarn install
COPY . /srv/app/frontend

CMD ["yarn", "start"]
