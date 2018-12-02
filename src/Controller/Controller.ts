import Country from '../Model/Country';
import CSVReader from '../Helper/CSVReader';
import Indicator from '../Model/Indicator';

type Countries = { [countryCode: string]: Country };

export default class Controller {
  public countries: Countries | undefined;
  private filePath: string;
  public startYear = 9999;
  public endYear = 0;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  /**
   * Initialize the controller with provide csv file.
   */
  init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        CSVReader.parseCSVWithSkippedLine(this.filePath, 4)
          .then(CSVReader.convertToJson)
          .then((data: any) => {
            const countries: Countries = {};
            data.forEach((item: { [k: string]: string }) => {
              let country;
              if (countries[item['Country Code']]) {
                country = countries[item['Country Code']];
              } else {
                country = new Country(item['Country Name'], item['Country Code']);
                countries[item['Country Code']] = country;
              }
              const indicator = new Indicator(item['Indicator Name'], item['Indicator Code']);
              for (let key in item) {
                /* Only add data to indicator when the key is number(year) */
                if (key.match(/^[0-9]*$/) && item[key] !== '') {
                  if (Number(key) > this.endYear) this.endYear = Number(key);
                  if (Number(key) < this.startYear) this.startYear = Number(key);
                  indicator.addData(Number(key), Number(item[key]));
                }
              }
              country.addIndicator(item['Indicator Code'], indicator);
            });
            this.countries = countries;
            // return countries;

            resolve();
            // this.getCountryWithHighestAvgIndicatorInRangeOfYear(countries, 'SP.POP.GROW', 1980, 1990);
            // this.getYearWithHighestValueOfIndicators('EN.ATM.CO2E.KT');
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  // 'SP.POP.GROW'
  /**
   * Get the country with the highest indicator value within a period
   * @param {string} indicatorCode - The indicator code
   * @param {number} startYear - The start year of the period
   * @param {number} endYear - The end year of the period
   * @return {{ name: string }|undefined} - And object with name of the country
   */
  getCountryWithHighestAvgIndicatorInRangeOfYear(
    indicatorCode: string,
    startYear: number,
    endYear: number
  ): { name: string };
  getCountryWithHighestAvgIndicatorInRangeOfYear(indicatorCode: string, startYear: number, endYear: number): undefined;
  public getCountryWithHighestAvgIndicatorInRangeOfYear(
    indicatorCode: string,
    startYear: number,
    endYear: number
  ): { name: string } | undefined {
    let highestAvg = 0;
    let country;
    try {
      for (let countriesKey in this.countries) {
        if (countriesKey !== 'WLD') {
          const indicator = this.countries[countriesKey].getIndicator(indicatorCode);
          if (indicator) {
            const avgValue = indicator.getAvgData(startYear, endYear);
            if (avgValue && avgValue > highestAvg) {
              highestAvg = avgValue;
              country = this.countries[countriesKey];
            }
          }
        }
      }
      return country ? { name: country.name } : undefined;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get the year with highest indicator value across all of the countries.
   * @param {string} indicatorCode - The indicator code
   * @return {{ year: number, averageValue: number } | undefined} - The object with the year of the result and the average value of the result.
   */
  getYearWithHighestValueOfIndicators(indicatorCode: string): { year: number, averageValue: number };
  getYearWithHighestValueOfIndicators(indicatorCode: string): void;
  public getYearWithHighestValueOfIndicators(indicatorCode: string): { year: number, averageValue: number } | void {
    let highestAvgValue = 0;
    let highestAvgValueYear = 0;
    for (let year = this.startYear; year <= this.endYear; year++) {
      let value = 0;
      let numOfCountry = 0;
      for (let countriesKey in this.countries) {
        if (countriesKey !== 'WLD') {
          let indicator = this.countries[countriesKey].getIndicator(indicatorCode);
          if (indicator && indicator.getData(year)) {
            value += indicator.getData(year);
            numOfCountry++;
          }
        }
      }
      const avgValue = numOfCountry !== 0 ? value / numOfCountry : 0;
      if (avgValue > highestAvgValue) {
        highestAvgValue = avgValue;
        highestAvgValueYear = year;
      }
    }
    if (highestAvgValueYear === 0) {
      return;
    }
    return { year: highestAvgValueYear, averageValue: highestAvgValue };
  }
}
