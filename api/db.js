var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/api-usuarios', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name: String,
    birthDate: String,
    phone: String,
    email: String,
    cpf: String,
    password: String
});

module.exports = { Mongoose: mongoose, UserSchema: userSchema }