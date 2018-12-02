# ABX Developer Exercise

## Instructions
I make this into an Node base API server. To get the server running:
1. Run `docker-compose up -d`.
2. Open your browser.
3. Browse [http://localhost:8081](http://localhost:8081)

### API
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
1. Start the server
2. Browse [link](http://localhost:8081/get-country-with-highest-avg-value-of-indicator-in-period/SP.URB.GROW?start=1980&end=1990)

For the question 2B:
1. Start the server
2. Browse [link](http://localhost:8081/get-year-with-highest-value-of-indicator/EN.ATM.CO2E.KT)

## Some Thought
1. Typescript:\
As I mentioned in the interview, I used Flow lot and move to Typescript just more than a month. 
In the most case, they are pretty much the same. But Typescript has more configuration than Flow. So 
at the linting part, I didn't rely too much on tslint because eslint integrate quite well with Typescript
on my IDE (Intellij).

2. Provide data:\
The data you provide shows all different indicators around different country. But it also include some group stats
which is not country-based such as World or IDA & IBRD total. As I don't under stand much on these group 
(are they counted as county?), I only exclude all the data with World in the calculation.

3. Testing:\
I try to cover all of my code with test. But some of the code like Helper or Server config that I couldn't find
the right way to test them, so I didn't write test code for them.

