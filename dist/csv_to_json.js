"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getJsonFromCSV() {
    return __awaiter(this, void 0, void 0, function* () {
        var csvjson = require('csvjson');
        var fs = require('fs');
        var path = require('path');
        var data = fs.readFileSync(path.join(__dirname, 'data_edited.csv'), { encoding: 'utf8' });
        /*
        {
            delimiter : <String> optional default is ","
            quote     : <String|Boolean> default is null
        }
        */
        var options = {
            delimiter: ',',
            quote: '"' // optional
        };
        // for multiple delimiter you can use regex pattern like this /[,|;]+/
        /*
        for importing headers from different source you can use headers property in options
        var options = {
            headers : "sr,name,age,gender"
        };
        */
        let json = csvjson.toSchemaObject(data, options);
        //console.log(json);
        return (json);
    });
}
exports.getJsonFromCSV = getJsonFromCSV;
//# sourceMappingURL=csv_to_json.js.map