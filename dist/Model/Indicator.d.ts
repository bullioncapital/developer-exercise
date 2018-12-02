export default class Indicator {
    name: string;
    code: string;
    data: {
        [year: number]: number;
    } | undefined;
    constructor(name: string, code: string);
    addData(year: number, value: number): void;
    getData(year: number): number;
    getData(year: number): void;
    getAvgData(startYear: number, endYear: number): number;
    getAvgData(startYear: number, endYear: number): void;
    getHighestData(): [number, number];
    getHighestData(): void;
}
