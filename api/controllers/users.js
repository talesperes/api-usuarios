module.exports = app => {
  require("dotenv-safe").config();
  const { validator } = require('../validation');
  const jwt = require('jsonwebtoken');
  const { connectDb, models } = require('../models/index')
  const controller = {};

  controller.listUsers = async (req, res) => {
    connectDb().then(async () => {
      const users = await models.User.find().exec();
      res.status(200).send(users)
    })
  }

  controller.getUser = async (req, res) => {

    connectDb().then(async () => {

      const { cpf } = req.params;
      const foundUser = await models.User.findByCpf(cpf);
  
      if (foundUser) {
        res.status(200).json(foundUser);
      } else {
        res.status(404).json({
          message: 'Usuário não encontrado na base.',
          success: false
        });
      }
      
    })

  }

  controller.addUser = async (req, res, next) => {

    connectDb().then(async () => {

      try {
  
        const { cpf } = req.body;
        const foundUser = await models.User.findByCpf(cpf);
  
        if (foundUser) {
          res.status(200).json({
            message: 'Esse usuário já esta cadastrado',
            success: false
          })
        }
        else {
  
          const userValidator = await validator.validateAsync(req.body);
          const user = new models.User(userValidator);
  
          user.save()
            .then(data => {
              res.status(200).json(data);
            })
  
        }
  
      } catch (error) {
        if (error.isJoi === true) error.status = 422 && res.send(error.message)
        next(error)
      }
    
    });

  };

  controller.removeUser = async (req, res) => {

    connectDb().then(async () => {
      
      const { cpf } = req.params;
      const foundUser = await models.User.findByCpf(cpf);
  
      if (foundUser) {
  
        await models.User.deleteOne({ cpf: cpf }, function (err, result) {
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
    
    });
    
  };

  controller.login = async (req, res) => {

    connectDb().then(async () => {
      
      const { cpf, password } = req.body;
      const foundUser = await models.User.findByLogin(cpf, password)
  
      if (foundUser) {
        const token = jwt.sign({ cpf }, process.env.SECRET, {
          expiresIn: 300
        });
        return res.json({ auth: true, token: token });
      }
  
      res.status(500).json({ message: 'Login inválido!' });

    });

  }
  
  return controller;
}