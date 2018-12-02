"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Country_1 = __importDefault(require("../Model/Country"));
const CSVReader_1 = __importDefault(require("../Helper/CSVReader"));
const Indicator_1 = __importDefault(require("../Model/Indicator"));
class Controller {
    constructor(filePath) {
        this.startYear = 9999;
        this.endYear = 0;
        this.filePath = filePath;
    }
    init() {
        return new Promise((resolve, reject) => {
            try {
                CSVReader_1.default.parseCSVWithSkippedLine(this.filePath, 4)
                    .then(CSVReader_1.default.convertToJson)
                    .then((data) => {
                    const countries = {};
                    data.forEach((item) => {
                        let country;
                        if (countries[item['Country Code']]) {
                            country = countries[item['Country Code']];
                        }
                        else {
                            country = new Country_1.default(item['Country Name'], item['Country Code']);
                            countries[item['Country Code']] = country;
                        }
                        const indicator = new Indicator_1.default(item['Indicator Name'], item['Indicator Code']);
                        for (let key in item) {
                            if (key.match(/^[0-9]*$/) && item[key] !== '') {
                                if (Number(key) > this.endYear)
                                    this.endYear = Number(key);
                                if (Number(key) < this.startYear)
                                    this.startYear = Number(key);
                                indicator.addData(Number(key), Number(item[key]));
                            }
                        }
                        country.addIndicator(item['Indicator Code'], indicator);
                    });
                    this.countries = countries;
                    resolve();
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    getCountryWithHighestAvgIndicatorInRangeOfYear(indicatorCode, startYear, endYear) {
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
        }
        catch (error) {
            console.log(error);
        }
    }
    getYearWithHighestValueOfIndicators(indicatorCode) {
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
exports.default = Controller;
//# sourceMappingURL=Controller.js.map