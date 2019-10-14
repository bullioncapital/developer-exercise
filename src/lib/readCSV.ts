import * as colors from 'colors';
import * as parser from 'csvtojson/v2';

import * as csv from 'csv-parser';
import * as fs from 'fs';

export const processor = (async (file: string) => {
    let output: any[] = [] ;

    console.log(colors.blue(`Initialise reading data from ${file}`));

    await parser({ eol: '\n' })
    .fromFile(file)
    .then((jsonObj) => {
        output = jsonObj;
    })

  return output;
});
