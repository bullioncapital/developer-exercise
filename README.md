# ABX Developer Exercise

## Instructions

1. Fork the repository.
2. Create a script or application that generates outputs to the following from data.csv:

	2a. The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude countries where any data entry for this time range is missing.

	2b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
3. Display the results to the user, however you choose to do so.
4. Create a pull request with your solution.

Note: There is no right or wrong way to achieve this. Please provide instructions on how to run your solution. Please use Docker where appropriate for access to dependencies (Databases, runtimes etc).

If you'd prefer not have this repo public on your Github, feel free to clone it into a private repo with your provider of choice. Give alex.revell@abx.com view permissions when you are complete.

## Solution Instructions

### Docker

1. Ensure docker daemon is running.
2. Pull docker image from docker hub : 
```docker pull hgedia/abx-developer-exercise```
3. Run the container :
```docker run hgedia/abx-developer-exercise```

### Testing Locally

1. Clone the repository : ```git clone git@github.com:hgedia/developer-exercise.git```
2. Execute
    ```
	cd developer-exercise
	npm i gulp-cli -g
	npm i
	npm run test
	```