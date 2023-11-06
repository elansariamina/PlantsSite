

module.exports = (app) => {
  const plantsController = require('../app/controllers/plants.controller');
  var router = require('express').Router();

  // Retrieve all Plants
  router.get('/', plantsController.findAll);

  // Delete a Plant with id
  router.delete('/:id', plantsController.delete);

  // Attach the router to the app
  app.use('/api/plants', router);
};
