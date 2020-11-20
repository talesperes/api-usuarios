const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
  },
  { timestamps: true },
);

userSchema.statics.findByCpf = async function (cpf) {
    let user = await this.findOne({
        cpf: cpf,
    });

    return user;
};

userSchema.statics.findByLogin = async function (cpf, password) {
    let user = await this.findOne({
        cpf: cpf,
        password: password
    });

    return user;
};

const User = mongoose.model('usuario', userSchema);

module.exports = { User }