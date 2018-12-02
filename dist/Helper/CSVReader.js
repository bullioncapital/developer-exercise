"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
const sync_1 = __importDefault(require("csv-parse/lib/sync"));
class CSVReader {
}
CSVReader.parseCSVWithSkippedLine = (filepath, skip = 0) => new Promise((resolve, reject) => {
    let i = 0;
    let modifiedData = "";
    try {
        let lineReader = readline_1.default.createInterface({
            input: fs_1.default.createReadStream(filepath, { start: 0 })
        });
        lineReader.on('line', (line) => {
            if (i < skip) {
            }
            else {
                modifiedData += line + "\n";
            }
            i++;
        });
        lineReader.on('close', () => {
            console.log('wirte finish');
            const result = sync_1.default(modifiedData, { quote: '"', ltrim: true, rtrim: true, delimiter: ',' });
            resolve(result);
        });
    }
    catch (error) {
        reject(error);
    }
});
CSVReader.convertToJson = (data) => {
    const result = [];
    const header = data[0];
    for (let i = 1; i < data.length; i++) {
        const newItem = {};
        data[i].forEach((item, index) => {
            newItem[header[index]] = item;
        });
        result.push(newItem);
    }
    return result;
};
exports.default = CSVReader;
//# sourceMappingURL=CSVReader.js.map