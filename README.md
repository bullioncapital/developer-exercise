# ABX Developer Exercise

## Instructions
I make this into 2 parts, a Node base API server and a React frontend. To get the service running:
1. Run `docker-compose up -d`.
2. Open your browser.
3. Browse [http://localhost:4000](http://localhost:4000) to see the App\
4. *Use [http://localhost:9999](http://localhost:9999) to access the API.*

*p.s. Change the port in .env file, REACT_APP_PORT for the frontend (3.) API_PORT for backend(4.)*

#### API
This api server contains 2 api:
- `/get-country-with-highest-avg-value-of-indicator-in-period/${indicator}?start=${startYear}&end=${endYear}`

Get the country with the highest average indicator's value within a given period\
`${indicator}`: Indicator code. e.g. SP.URB.GROW\
`${startYear}`: Start year. e.g. 1980\
`${endYear}`: End year. e.g. 1990


- `/get-year-with-highest-value-of-indicator/${indicator}`

Get the year with highest indicator value across the world\
`${indicator}`: Indicator code. e.g. EN.ATM.CO2E.KT

***

For the question 2A:
1. Do the instruction
2. Click on 2A button
3. The default value in the input is the question you ask for, feel free to change those number.
4. Click on Get to retrieve the result.
5. Click on Reset to set all value to default

For the question 2B:
1. Do the instruction
2. Click on 2B button
3. The default value in the input is the question you ask for, feel free to change those number.
4. Click on Get to retrieve the result.
5. Click on Reset to set all value to default

## Some Thought
1. __Typescript:__\
As I mentioned in the interview, I used Flow lot and move to Typescript just more than a month. 
In the most case, they are pretty much the same. But Typescript has more configuration than Flow. 
At the linting part, I didn't rely too much on tslint because Eslint integrate quite well with Typescript
on my IDE (Intellij), and I use Prettier commonly. So linting shouldn't be a problem.

2. __Data Management__\
When I just started, I have thought about using relational database and tear these csv file in to 3 tables. However, I don't know if I am allowed to modify
the data, so I didn't go further with this method. If I managed these data with relational database, here are
my schemas: 
    * Country (**id**, code, name)
    * Indicator (**id**, code, name)
    * Record (**id**, *indicatorId*, *countryId*, year, value)

    The provided data shows all different indicators around different country. But it also include some group stats
which is not country-based such as World or IDA & IBRD total. As I don't under stand much on these group 
(are they counted as county?), I only exclude all the data with World in the calculation.

3. __Testing:__\
I try to cover all of my code with test. But some of the code like Helper or Server config that I couldn't find
the right way to test them, so I didn't write test code for them.

4. __Frontend:__\
I finished the API server first then I think it's better to have a frontend app to display the data. 
To do this as easy as possible, I use create-react-app with Reactstrap(Bootstrap4)/Styled-components. All
the codes are related to displaying the data and the interface interaction, so I didn't cover any test code
on them.

***If you have any question, please contact me via email: [another0219@gmail.com](another0219@gmail.com)***



