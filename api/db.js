var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name: String,
    birthDate: String,
    phone: String,
    email: String,
    cpf: String,
    password: String
});

module.exports = { Mongoose: mongoose, UserSchema: userSchema }