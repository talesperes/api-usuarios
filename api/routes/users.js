module.exports = app => {
  const controller = app.controllers.users;
  
  app.route('/api/v1/users')
    .get(controller.listUsers)
    .post(controller.addUser)

  app.route('/api/v1/users/:cpf')
    .delete(controller.removeUser)
    .get(controller.getUser)

}