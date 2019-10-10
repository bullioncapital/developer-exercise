# ABX Developer Exercise

## Instructions followed

[x] Fork the repository.
[x] Create a script or application that generates outputs to the following from data.csv:

	2a. The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude countries where any data entry for this time range is missing.

	2b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
[x] Display the results to the user, however you choose to do so.
[x] Create a pull request with your solution.

## How to run

Please follow below instructions to run solution:

- checkout this branch

- install dependencies using `yarn` or `npm install`

- there are two ways to execute script

  - one way is `ts-node src/index.ts` (`ts-node` should be installed globally)

  - other way is build first and then execute

    - `yarn build` or `npm run build`

    - `node build/index.js`
