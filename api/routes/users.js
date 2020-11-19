module.exports = app => {
  const jwt = require('jsonwebtoken');
  const controller = app.controllers.users;

  const verifyJWT = (req, res, next) =>  {

    const token = req.headers['x-access-token'];
  
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
      req.userId = decoded.id;
      next();
    });
  }
  
  app.route('/api/v1/users')
    .get(controller.listUsers)
    .post(controller.addUser)

  app.route('/api/v1/users/:cpf')
    .delete(verifyJWT, controller.removeUser)
    .get(verifyJWT, controller.getUser)

  app.route('/api/v1/login')
    .post(controller.login)

}