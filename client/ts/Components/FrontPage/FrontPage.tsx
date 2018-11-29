import * as React from 'react'
import ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { ComponentProps } from './FrontPageContainer'

export interface ValueAverage {
  value: number,
  averagedBy: number,
  averagedValue: number,
  year: Year
}

export interface Year {
  year: number,
  value: string
}

export interface Indicator {
  indicator_name: string,
  indicator_code: string,
  years: Year[]
}

export interface CountryData {
  country_name: string,
  country_code: string,
  indicators: Indicator[],

  //hardcoded these to save time
  UrbanPopGrowthAverage19801990: number,
  YearWithHighestC02Emmisions: Year
}


const defaultState = {
  loading: true,
  json: '',
  countryData: [] as CountryData[]
}


 
export class FrontPage extends React.Component<ComponentProps, typeof defaultState> {

  constructor(props: any) {
    super(props);
    this.state = _.cloneDeep(defaultState);
  }

  componentWillMount() {
    this.getAndSortJson();
  }

  async getAndSortJson() {
    this.setState({
      loading: true
    })
    let json = await this.props.recieveJsonFromServer("WORKING???????");

    let countryData:CountryData[] = [];

    _.each(json.data, (line:any) => {
      
      let years:Year[] = []

      for (let _year = 1960; _year < 2017; _year++) {
        let year:Year = {...year,
          year: _year,
          value: line[_year.toString()]
        }
        years.push(year)
      }

      let indicator:Indicator = {...indicator,
        indicator_name: line['Indicator Name'],
        indicator_code: line['Indicator Code'],
        years: years
      }

      let countryExists = false
      _.forEach(countryData, (country: CountryData) => {
        if(country.country_code === line['Country Code']){
          countryExists = true;
          country.indicators.push(indicator)
        }
      })

      if(countryExists === false){
        let newIndicators:Indicator[] = [];
        newIndicators.push(indicator);

        let newCountry:CountryData = {...newCountry,
          country_name: line['Country Name'],
          country_code: line['Country Code'],
          indicators: newIndicators
        }

        countryData.push(newCountry)
      }
    })


    this.setState({
      loading: false,
      json: '',
      countryData: countryData
    })
  }

  renderAveragePopGrowth(){

    let allCountryData:CountryData[] = _.cloneDeep(this.state.countryData);
    let averages:number[] = [];

    allCountryData = _.sortBy(allCountryData, (country:CountryData) => {

      let indicator:Indicator = _.find(country.indicators, (i:Indicator)=>{
        return i.indicator_code == "SP.URB.GROW"
      });

      let total:number = 0; let divideby:number = 0;
      let skip = false;

      let range:Year[] = indicator.years.slice(20,31);

      _.each(range, (year:Year) => {
        if(year.value === ""){
          skip = true;
        } else {
          total += parseInt(year.value)
          divideby ++;
        }
      })

      let av:number = total / divideby;

      if(skip)
        av = -100;

      
      country.UrbanPopGrowthAverage19801990 = av;

      return country.UrbanPopGrowthAverage19801990;


    }).reverse();

    return (
      <div className="answer-div">
        <h1>Country with Highest Population Growth (Annual %) between 1980-1990</h1>
        <span>(Excludes countries with missing data between this time period</span>
        <h1>Country: {allCountryData[0].country_name}</h1>
        <h1>Average: {allCountryData[0].UrbanPopGrowthAverage19801990}%</h1>
      </div>
    )
  }

  renderHighestC02Year() {

    let allCountryData:CountryData[] = _.cloneDeep(this.state.countryData);

    let averagedValues:ValueAverage[] = [];

    _.each(allCountryData, (country:CountryData) => {
      let indicator:Indicator = _.find(country.indicators, (i:Indicator)=>{
        return i.indicator_code == "EN.ATM.CO2E.KT"
      });

      _.each(indicator.years, (year:Year, index:number) => {
        if(averagedValues[index] === undefined){
          if(year.value === "") {
            let newAverage:ValueAverage = {...newAverage,
              value: 0,
              averagedBy: 0, 
              year: year}
            averagedValues.push(newAverage);
          } else {
            let newAverage:ValueAverage = {...newAverage,
              value: parseInt(year.value),
              averagedBy: 1,
              year: year }
            averagedValues.push(newAverage);
          }
        } else {
          if(year.value !== ""){
            averagedValues[index].value += parseInt(year.value)
            averagedValues[index].averagedBy ++;
          }
        }
      })
    })


    averagedValues = _.sortBy(averagedValues, (value:ValueAverage)=>{
      let average = value.value / value.averagedBy
      
      if(_.isNaN(average)) {
        average = 0 
      }

      value.averagedValue = average

      return value.averagedValue
    }).reverse()

    return(
      <div className="answer-div">
        <h1>The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.</h1>
        <h1>Year: {averagedValues[0].year.year} with {averagedValues[0].averagedValue} kt averaged</h1>
      </div>
    )
  }

  render() {
    return (
        <div className='page-container'>
          {
            this.state.loading ?
          (
            <h1>LOADING...</h1>
          ):(
            <div>
              {this.renderAveragePopGrowth()}
              {this.renderHighestC02Year()}
            </div>
          )}
        </div>
    );
  }
}
 
export default FrontPage;