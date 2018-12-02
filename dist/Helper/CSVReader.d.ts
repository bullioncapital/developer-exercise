export default class CSVReader {
    static parseCSVWithSkippedLine: (filepath: string, skip?: number) => Promise<string[][]>;
    static convertToJson: (data: string[][]) => {
        [k: string]: string;
    }[];
}
