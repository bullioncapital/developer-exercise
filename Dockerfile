FROM node:8.15.0-jessie
WORKDIR /app
COPY . /app
RUN yarn
CMD ["yarn", "start"]