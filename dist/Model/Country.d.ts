import Indicator from './Indicator';
export default class Country {
    code: string;
    name: string;
    private indicators;
    constructor(name: string, code: string);
    getIndicator(indicatorCode: string): Indicator;
    getIndicator(indicatorCode: string): void;
    addIndicator(indicatorCode: string, indicator: Indicator): void;
}
