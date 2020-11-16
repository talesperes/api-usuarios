module.exports = app => {
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

    controller.addUser = (req, res) => {

        console.log(req.body);

        usersMock.data.push({
            name: req.body.name,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
            email: req.body.email,
            cpf: req.body.cpf
        });
    
        res.status(201).json(usersMock);
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
  
    return controller;
}