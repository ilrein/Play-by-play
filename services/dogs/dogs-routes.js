const _ = require('lodash');
const Dog = require('./dog-model.js');
const errorWarning = 'Error occured';
module.exports = function (app) {
  // Routes for the Dog model

  // Create
  app.post('/dog', (req, res) => {
    const newDog = new Dog(req.body);
    newDog.save((err) => {
      if (err) {
        res.json({ result: errorWarning, error: err });
      } else {
        res.json({ result: 'dog created successfully' });
      }
    });
  });

  // Get
  // All
  app.get('/dogs', (req, res) => {
    Dog.find((err, dogs) => { // eslint-disable-line
      if (err) {
        res.json({ result: errorWarning, error: err });
      } else {
        res.json({ result: 'Got all dogs', data: dogs });
      }
    });
  });

  // Just one
  app.get('/dog/:id', (req, res) => {
    Dog.findById(req.params.id, (err, dog) => {
      if (err) {
        res.json({ result: errorWarning, error: err });
      }
      if (dog) {
        res.json({ result: 'Got dog', data: dog });
      } else {
        res.json({ result: 'Dog not found' });
      }
    });
  });

  // Update
  app.put('/dog/:id', (req, res) => {
    Dog.findById(req.params.id, (err, dog) => {
      if (err) {
        res.json({ result: errorWarning, error: err });
      }
      if (dog) {
        _.merge(dog, req.body);
        dog.save((error) => {
          if (error) {
            res.json({ result: errorWarning, error });
          }
          res.json({ result: 'Updated dog' });
        });
      } else {
        res.json({ result: 'Dog not found' });
      }
    });
  });

  // Delete
  app.delete('/dog/:id', (req, res) => {
    Dog.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.json({ result: errorWarning, err });
      } else {
        res.json({ result: 'Dog deleted' });
      }
    });
  });
};
