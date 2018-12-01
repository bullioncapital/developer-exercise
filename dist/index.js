"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
let i = 0;
const parseCSVWithSkippedLine = (filepath, skip) => new Promise((resolve, reject) => {
    let i = 0;
    const result = Array();
    const fileWriter = fs_1.default.createWriteStream(path_1.default.resolve(__dirname, 'data-modify.csv'));
    let lineReader = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(filepath, { start: 0 })
    });
    lineReader.on('line', (line) => {
        if (i < skip) {
        }
        else {
            fileWriter.write(line);
            const convertedLine = line.split(',').filter((item) => item && item !== '').map((item) => item.replace(/"/g, ''));
            result.push(convertedLine);
        }
        i++;
    });
    lineReader.on('close', () => {
        console.log('wirte finish');
        resolve(result);
    });
});
const convertToJson = (data) => {
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
parseCSVWithSkippedLine(path_1.default.resolve(__dirname, 'data.csv'), 4).then(convertToJson).then((data) => {
    console.log(data[0]);
});
//# sourceMappingURL=index.js.map