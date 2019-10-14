# ABX Developer Exercise

## Instructions

1. Fork the repository.
2. Create a script or application that generates outputs to the following from data.csv:

	2a. The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude countries where any data entry for this time range is missing.

	2b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
3. Display the results to the user, however you choose to do so.
4. Create a pull request with your solution.

Note: There is no right or wrong way to achieve this. Please provide instructions on how to run your solution. Please use Docker where appropriate for access to dependencies (Databases, runtimes etc).

If you'd prefer not have this repo public on your Github, feel free to clone it into a private repo with your provider of choice. Give christopher.dingli@abx.com view permissions when you are complete.

## My Changes

### dev setup

* install yarn package manager `npm install -g yarn`.
* install packages by `yarn install`.

### Unit Testing

test suite is using jest for unit tests and to generate report on test coverage. Coverage is set to low currently and during the deployment to production it is expected to be over 90%.

test coverage reports are setuped using jest reporter and currently coverage is set to low.

* run jest unit test suit `yarn test:unit`.

### Integration Tests

Integration test suite runs on newman cli and may run using following command;

note: make sure api is running on another cli tab while you excecute integration tests.

`yarn test:integration`

### Linting

Code syntax and typescipt linting is checked throughout the project using tslint. Please enter following command to run lint.

`yarn lint`

### Start server and Loading data into mongodb docker

loading data into database using following command when application running localy.

note: up a docker mongodb instance and run the server locally.

* Run `yarn db-up` in order to start the mongodb docker instance.
* Run `yarn build` command to compile code from typescipt.
* Run `yarn load` to upload all the data to the mongodb.
* run `yarn start` finally to start the https server.
* Test sending a request to the api endpoint. {refer to API Test section below to send request to test the api}

Note: On error deploying docker setup try removing all existing images with same name.

### API Test

* Download and install Postman from following website <https://www.getpostman.com>.
* Import following postman file to the postman <resources/postman/test.postman_collection.json>.
* Endpoint payload body is as follows:

request for report id = 1:
`{
    "reportid": 1,
    "request": "getstats",
    "category": {
      "id": 11,
      "name": "Urban population growth"
    }
}`

request for report id = 2:
`{
    "reportid": 2,
    "request": "getstats",
    "category": {
      "id": 22,
      "name": "CO2 emissions"
    }
}`

### Running Api Server and mongo db both on docker

* currently some npm issue starting the server and loading the data to the table.
* once the mionor issue resolved `docker composer up` command should get it up and running an the api host will be `http://localhost/getstats`.

### JSON schema validation

JSON schema validation is implementation for demondstrated on 'src/lib/getStats.ts: 12,13'. JSON schema is `resources/schema/statsRequest.json`. For the validations VLC npm module is used.

### interface

single interface is implimented for demonstration on `src/lib/co2Emissions.ts` as follows.

`export interface IHighestAverage {
    country: string;
    average: number;
}`
