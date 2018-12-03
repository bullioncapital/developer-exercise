export default class Indicator {
  name: string;
  code: string;
  data: { [year: number]: number } | undefined;

  /**
   * @param {string} name - Indicator name
   * @param {string} code - Indicator code
   */
  public constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }

  /**
   * Add new data to Indicator
   * @param {number} year - The year of the new data
   * @param {number} value - The value of the new data
   */
  public addData(year: number, value: number) {
    if (!this.data) {
      this.data = {};
    }
    this.data[year] = value;
  }

  /**
   * Get the data base on the year
   * @param {number} year - The year of the data.
   * @return {number} - The value of the data of the year.
   */
  getData(year: number): number;
  getData(year: number): void;
  public getData(year: number): number | void {
    if (this.data && this.data[year] !== undefined) {
      return this.data[year];
    }
    return;
  }

  /**
   * Get the average data of a period between two different year.
   * @param {number} startYear - The start year of the range
   * @param {number} endYear - The end year of the range
   * @return {number|void} - The average value between a period
   */
  getAvgData(startYear: number, endYear: number): number;
  getAvgData(startYear: number, endYear: number): void;
  public getAvgData(startYear: number, endYear: number): number | void {
    if (!this.data) {
      console.error('Indicator\'s data is not defined');
      return;
    }
    if (startYear > endYear) {
      console.error('Start year should be before the end year');
      return;
    }
    let result = 0;
    for (let i = startYear; i <= endYear; i++) {
      if (!this.data[i]) {
        console.error(`${i}'s data is missing`);
        return;
      }
      result += this.data[i];
    }
    return result / (endYear - startYear + 1);
  }

  /**
   * Get the year of highest data.
   * @return {[number, number]} - [year, value];
   */
  getHighestData(): [number, number];
  getHighestData(): void;
  public getHighestData(): [number, number] | void{
    if (!this.data) {
      console.error('Indicator\'s data is not defined');
      return;
    }
    let result = 0;
    let year = 0;
    for (let dataKey in this.data) {
      if (this.data[dataKey]) {
        if (this.data[dataKey] > result) {
          result = this.data[dataKey];
          year = Number(dataKey);
        }
      }
    }
    if (year === 0) return;

    return [year, result];
  }
}
