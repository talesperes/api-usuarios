module.exports = app => {
  const { validator } = require('../validation');
  const usersDB = app.data.users;
  const controller = {};

    const { users: usersMock } = usersDB;
  
    controller.listUsers = (req, res) => res.status(200).json(usersDB);

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
Z
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
  
    return controller;
}