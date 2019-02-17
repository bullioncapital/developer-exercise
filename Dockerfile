# grab lightweight node
FROM node:10.15.1-alpine
# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy files in that are needed to build our source code
COPY tsconfig.json .
COPY package.json .
COPY src ./src/
COPY data.csv .

# first install node dependencies, including dev dependencies
RUN npm install --production=false --silent
# build our code, this creates our traspiled javascript in the dist folder
RUN npm run build

# remove unneeded files
RUN npm run rimraf src tsconfig.json node_modules
# get just our dependencies needed in production
RUN npm install --production --silent
RUN rm package-lock.json && rm package.json

FROM node:10.15.1-alpine
# set working directory
WORKDIR /usr/app
# copy in our node_modules and our transpiled javascript
COPY --from=0 /usr/src/app/ .
# start app
CMD ["node", "./dist/index.js"]