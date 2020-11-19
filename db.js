const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/api-usuarios', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { Mongoose: mongoose }