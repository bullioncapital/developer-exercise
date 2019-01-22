import {readFile} from 'fs';
import * as parser from 'csv-parse';

/**
 * Basic class for loading the provided data
 */
export default class CSVLoader {
  private _path: string;
  private _rawData: string;
  private _data: any[];

  set path(value: string) {
    this._path = value;
  }

  get data(): any[] {
    return this._data;
  }

  public async load() {
    return new Promise((resolve, reject) => {
      readFile(this._path, 'utf8', this.onReadFile(resolve, reject));
    });
  }

  private onReadFile(resolve, reject) {
    return (err: NodeJS.ErrnoException, data: string) => {
      if (err) return reject(err);
      this._rawData = data;
      return resolve();
    };
  }

  private static getColumnsFromText(text: string): string[] {
    return text
      .split('\n')[4]
      .replace(/"/g, '')
      .split(',');
  }

  public async parse() {
    return new Promise((resolve, reject) => {
      const columns: string[] = CSVLoader.getColumnsFromText(this._rawData);

      parser(this._rawData, {
        from_line: 5,
        trim: true,
        skip_lines_with_empty_values: true,
        skip_lines_with_error: true,
        columns,
      }, this.onParseCSV(resolve, reject));
    });
  }

  private onParseCSV(resolve, reject) {
    return (err, output) => {
      if (err) return reject(err);
      this._data = output;
      return resolve(true);
    };
  }
}