import * as colors from 'colors';
import * as parser from 'csvtojson';
import * as fs from 'fs';

export const processor = (async(file: string) => {
    let output: any[] = [] ;

    console.log(colors.blue(`Initialise reading data from ${file}`));

    await parser()
    .fromFile(file)
    .then((jsonObj) => {
        output = jsonObj;
    })

  return output;
});
