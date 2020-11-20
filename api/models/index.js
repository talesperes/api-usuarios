const mongoose = require('mongoose');
const  { User } = require('./user.js');
 
const connectDb = () => {
  return mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
};

const models = { User };

module.exports = { connectDb: connectDb, models: models }
