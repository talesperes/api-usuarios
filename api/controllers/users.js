module.exports = app => {
  require("dotenv-safe").config();
  const { validator } = require('../validation');
  const jwt = require('jsonwebtoken');
  const usersDB = app.data.users;
  const controller = {};

    const { users: usersMock } = usersDB;
  
    controller.listUsers = (req, res, next) => {
      res.status(200).json(usersDB);
    }
    controller.getUser = (req, res) => {

        const { cpf } = req.params;
        const foundUser = usersMock.data.find(user => user.cpf == cpf)

        if(foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).json({
                message: 'Usuário não encontrado na base.',
                success: false
            });
        }

    }

    controller.addUser = async (req, res, next) => {

      try{

        const { cpf } = req.body;
        const foundUser = usersMock.data.find(user => user.cpf === cpf)

        if(foundUser) {
          res.status(200).json({
            message: 'Esse usuário já esta cadastrado',
            success: false
          })
        }
        else {
          const user = await validator.validateAsync(req.body);
          usersMock.data.push(user);
          res.status(200).json(usersMock);
        }
        
      } catch (error) {
        if (error.isJoi === true ) error.status = 422 && res.send(error.message)
        next(error)
      }
  
    };

    controller.removeUser = (req, res) => {

      const { cpf } = req.params;
  
      const foundUserIndex = usersMock.data.findIndex(user => user.cpf === cpf);
  
      if (foundUserIndex === -1) {
        res.status(404).json({
          message: 'Usuário não encontrado na base.',
          success: false,
          users: usersMock,
        });
      } else {
        usersMock.data.splice(foundUserIndex, 1);
        res.status(200).json({
          message: 'Usuário encontrado e deletado com sucesso!',
          success: true,
          users: usersMock,
        });
      }
    };
    
    controller.login = (req, res) => {

      const { cpf, password } = req.body;
      const foundUser = usersMock.data.find(user => user.cpf == cpf && user.password == password);

      if(foundUser) {
        const token = jwt.sign({cpf}, process.env.SECRET, {
          expiresIn: 300
        });
        return res.json({ auth: true, token: token });
      }

      res.status(500).json({message: 'Login inválido!'});
    }

    return controller;
}