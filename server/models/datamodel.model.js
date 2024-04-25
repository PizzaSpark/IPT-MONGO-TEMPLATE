const mongoose = require('mongoose');
const { Schema, model: _model } = mongoose;

const requiredString = { type: String, required: true };
const requiredUniqueString = { type: String, required: true, unique: true };
const collectionName = 'DataModel';

const DataModel = new Schema(
  {
    firstname: requiredString,
    lastname: requiredString,
    middlename: requiredString,
    email: requiredUniqueString, // ito yung unique na as in primary key mo
    password: requiredString,
  },
  { collection: collectionName } 
);

const model = _model(collectionName, DataModel);

module.exports = model;