# ABX Developer Exercise

## Installation
- `docker build --tag=developer-exercise .`

## Running the application
- `docker run developer-exercise`
- The response will output to the console:
```
C:\Users\Christopher\projects\developer-exercise>docker run developer-exercise
yarn run v1.12.3
$ ts-node src/main.ts
┌─────────┬──────────┐
│ country │ Botswana │
├─────────┼──────────┤
│ year    │ 1994     │
└─────────┴──────────┘
Done in 4.21s.
```

## Instructions
1. Fork the repository.
2. Create a script or application that generates outputs to the following from data.csv:
	2a. The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude countries where any data entry for this time range is missing.

	2b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
3. Display the results to the user, however you choose to do so.
4. Create a pull request with your solution.

Note: There is no right or wrong way to achieve this. Please provide instructions on how to run your solution. Please use Docker where appropriate for access to dependencies (Databases, runtimes etc).

If you'd prefer not have this repo public on your Github, feel free to clone it into a private repo with your provider of choice. Give sam.jeston@abx.com view permissions when you are complete.
