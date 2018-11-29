export async function getJsonFromCSV() {
    var csvjson = require('csvjson');
    var fs = require('fs');
    var path = require('path');
    var data = fs.readFileSync(path.join(__dirname, 'data_edited.csv'), { encoding : 'utf8'});
    /*
    {
        delimiter : <String> optional default is ","
        quote     : <String|Boolean> default is null
    }
    */
    var options = {
    delimiter : ',', // optional
    quote     : '"' // optional
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
    return(json);
}