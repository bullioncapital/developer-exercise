FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --global gulp-cli
RUN npm install
COPY . .
CMD ["npm", "start"]