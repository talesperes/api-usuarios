module.exports = app => {
  require("dotenv-safe").config();
  const { validator } = require('../validation');
  const db = require('../db');
  const jwt = require('jsonwebtoken');
  const controller = {};
  const userModel = db.Mongoose.model('usuario', db.UserSchema);

  controller.listUsers = async (req, res) => {
    const users = await userModel.find().exec();
    res.status(200).json(users);
  }

  controller.getUser = async (req, res) => {

    const { cpf } = req.params;
    const foundUser = await userModel.findOne({ cpf: cpf }).exec();

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({
        message: 'Usuário não encontrado na base.',
        success: false
      });
    }

  }

  controller.addUser = async (req, res, next) => {

    try {

      const { cpf } = req.body;
      const foundUser = await userModel.exists({ cpf: cpf });

      if (foundUser) {
        res.status(200).json({
          message: 'Esse usuário já esta cadastrado',
          success: false
        })
      }
      else {

        const user = await validator.validateAsync(req.body);
        const newUser = new userModel(user);

        newUser.save()
          .then(data => {
            res.status(200).json(data);
          })

      }

    } catch (error) {
      if (error.isJoi === true) error.status = 422 && res.send(error.message)
      next(error)
    }

  };

  controller.removeUser = async (req, res) => {

    const { cpf } = req.params;
    const foundUser = await userModel.exists({ cpf: cpf });

    if (foundUser) {

      await userModel.deleteOne({ cpf: cpf }, function (err, result) {
        if (err)
          res.send(err);
        else
          res.status(200).send(result);
      });

    } else {

      res.status(404).json({
        message: 'Usuário não encontrado na base.',
        success: false
      });

    }
  };

  controller.login = async (req, res) => {

    const { cpf, password } = req.body;
    const foundUser = await userModel.exists({ cpf: cpf, password: password })

    if (foundUser) {
      const token = jwt.sign({ cpf }, process.env.SECRET, {
        expiresIn: 300
      });
      return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
  }

  return controller;
}