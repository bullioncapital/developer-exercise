import * as mongoose from 'mongoose';
import { statsFields } from './statsFields';

/**
 *  toDo:
 *  this connection string and password contain sensitive information
 *  it expected to store someware else from code preferable 
 *  encrypted or in a key manager
 * */
export const getModel = (async () => {
  const options: object = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // await mongoose.connect('mongodb://mongo:27017/mongodb', options) // docker url for using with docker-composer up
  await mongoose.connect('mongodb://localhost:27017/mongodb', options) // docker url for running the api server on host
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

  let schema = {}; 
  statsFields.map((value) => {
    schema[value] = String;
  }); 
  
  var Schema = new mongoose.Schema(schema);

  if(mongoose.connection.models['Stats']) {
    delete mongoose.connection.models['Stats'];
  }

  const model: any = mongoose.model('Stats', Schema);

  return model;
});
