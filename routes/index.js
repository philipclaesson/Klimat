const routes = require('express').Router();


//Routes the /users path
//const users = require('./users');
//routes.use('/users', users);

console.log("index");


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connectedd!' });
});

module.exports = routes;