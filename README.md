# ABX Developer Exercise

## Instructions

1. Fork the repository.
2. Create a script or application that generates outputs to the following from data.csv:

   2a. The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude countries where any data entry for this time range is missing.

   2b. The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.

3. Display the results to the user, however you choose to do so.
4. Create a pull request with your solution.

Note: There is no right or wrong way to achieve this. Please provide instructions on how to run your solution. Please use Docker where appropriate for access to dependencies (Databases, runtimes etc).

If you'd prefer not have this repo public on your Github, feel free to clone it into a private repo with your provider of choice. Give sam.jeston@abx.com view permissions when you are complete.

## Important Assumptions

### 2a.

I have assumed that because it says `between these dates`, that if it asks for between 1980 to 1990, that I would get the data for years 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989 and NOT 1990.

### 2b.

I have assumed that even if there is no data for a country on a date column that we just remove it and still average the other countries values for that date (this is different to 2a as 2a required the whole country to be removed.).

## General Notes

I have displayed the results on a page (html). Click on the buttons to reveal the answer to 2a and 2b.

## Running My Code

### Docker

1. `npm run docker-local`
2. Go to `localhost:3000` or `<Docker_Machine_IP>:3000`
3. Use buttons to get answers, OR:

   3a. Access `localhost:3000/2a` or `<Docker_Machine_IP>:3000/2a` to see the results for 2a

   3b. Access `localhost:3000/2b` or `<Docker_Machine_IP>:3000/2b` to see the results for 2b

### Local

1. `npm install && npm run start`
2. Go to `localhost:3000` or `<Docker_Machine_IP>:3000`
3. Use buttons to get answers, OR:

   3a. Access `localhost:3000/2a` or `<Docker_Machine_IP>:3000/2a` to see the results for 2a

   3b. Access `localhost:3000/2b` or `<Docker_Machine_IP>:3000/2b` to see the results for 2b

### Tests

1. `npm install && npm run test`
