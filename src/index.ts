import parse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';
import readline from 'readline';

let i = 0;


const parseCSVWithSkippedLine = (filepath: string, skip: number): Promise<Array<Array<string>>> => new Promise((resolve, reject) => {
  let i = 0;
  const result = Array<Array<string>>;
  const fileWriter = fs.createWriteStream(path.resolve(__dirname, 'data-modify.csv'));
  let lineReader = readline.createInterface({
    input: fs.createReadStream(filepath, { start: 0 })
  });
  lineReader.on('line', (line) => {
    if (i < skip) {
      // console.log(line);
    } else {
      fileWriter.write(line);
      const convertedLine = line.split(',').filter((item) => item && item !== '').map((item:string) => item.replace(/"/g, ''));
      result.push(convertedLine);
    }
    i++;
  });
  lineReader.on('close', () => {
    console.log('wirte finish');
    resolve(result);
  });
});
/**
 * Convert given array to JSON, the item in the first row will be the key for each object
 * @param {Array<Array<string>>} data - Data generate from parseCSVWithSkippedLine
 * @return {Array<{[k: string]: string}>} - Array of object which use the item in first row of given array as the key;
 */
const convertToJson = (data:Array<Array<string>>): Array<{[k: string]: string}> => {
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

parseCSVWithSkippedLine(path.resolve(__dirname, 'data.csv'), 4).then(convertToJson).then((data) => {
  console.log(data[0]);
});
//
// const csvData = [];
//
// fs.createReadStream(path.resolve(__dirname, 'data.csv'), {start: 89})
//   .pipe(parse({quote: '"', ltrim: true, rtrim: true, delimiter: ','}))
//   .on('error', (err) => {
//     console.log(err);
//   })
// .on('data', function(csvrow) {
//     if (i < 5) {
//     console.log(csvrow);
//   }
//     i++;
//   // console.log(csvrow);
//   //do something with csvrow
//   csvData.push(csvrow);
// })
// .on('end',function() {
//   //do something wiht csvData
//   console.log(csvData[0]);
// });
