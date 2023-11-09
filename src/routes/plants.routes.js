module.exports = (app) => {
  const plantsController = require('../app/controllers/plants.controller');
  const clientsController = require('../app/controllers/clients.controller');
  const commandsController = require('../app/controllers/command.controller');
  var router = require('express').Router();


  router.get('/plants/', plantsController.findAll);
  router.get('/clients/', clientsController.findAll);
  router.get('/commands/', commandsController.findAll);

  router.post('/clients', clientsController.create);
  router.post('/commands', commandsController.create);

  router.delete('/plants/:id', plantsController.delete);
  router.delete('/clients/:id', clientsController.delete);


  app.use('/api', router);
};
