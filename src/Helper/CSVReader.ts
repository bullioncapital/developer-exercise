import readline from "readline";
import fs from "fs";
import parse from 'csv-parse/lib/sync';

export default class CSVReader {
  /**
   * Parse CSV to Array with the skip line. User can choose to skip first x line.
   *
   * @param {string} filepath - The path of the csv file
   * @param {number} skip - The number of the line to skip from the first line.
   * @return {Promise} - A Promise return the result array when it's resolve, return error message when it reject
   */
  static parseCSVWithSkippedLine = (filepath: string, skip: number = 0): Promise<Array<Array<string>>> => new Promise((resolve, reject) => {
    let i = 0;
    let modifiedData = "";
    try {
      let lineReader = readline.createInterface({
        input: fs.createReadStream(filepath, { start: 0 })
      });
      lineReader.on('line', (line) => {
        if (i < skip) {
        } else {
          modifiedData += line + "\n";
        }
        i++;
      });
      lineReader.on('close', () => {
        console.log('wirte finish');
        const result = parse(modifiedData, {quote: '"', ltrim: true, rtrim: true, delimiter: ','});

        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });


  /**
   * Convert given array to an array of object, the item in the first row will be the key for each object
   *
   * @param {Array<Array<string>>} data - Data generate from parseCSVWithSkippedLine
   * @return {Array<{[k: string]: string}>} - Array of object which use the item in first row of given array as the key;
   */
  static convertToJson = (data:Array<Array<string>>): Array<{[k: string]: string}> => {
    const result = [];
    const header = data[0];
    for(let i = 1; i < data.length; i++) {
      const newItem: {[k: string]: string} = {};
      data[i].forEach((item, index) => {
        newItem[header[index]] = item;
      });
      result.push(newItem);
    }
    return result;
  };
}
