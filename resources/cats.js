const _ = require('lodash');
const Cat = require('./cat.js');
const errorWarning = 'Error occured';
module.exports = function (app) {
  // Routes for the Cat model

  // Create
  app.post('/cat', (req, res) => {
    const newCat = new Cat(req.body);
    newCat.save((err) => {
      if (err) {
        res.json({ result: errorWarning, error: err });
      } else {
        res.json({ result: 'cat created successfully' });
      }
    });
  });

  // Get
  // All
  app.get('/cats', (req, res) => {
    Cat.find((err, cats) => { // eslint-disable-line
      if (err) {
        res.json({ result: errorWarning, error: err });
      } else {
        res.json({ result: 'Got all cats', data: cats });
      }
    });
  });

  // Just one
  app.get('/cat/:id', (req, res) => {
    Cat.findById(req.params.id, (err, cat) => {
      if (err) {
        res.json({ result: errorWarning, error: err });
      }
      if (cat) {
        res.json({ result: 'Got cat', data: cat });
      } else {
        res.json({ result: 'Cat not found' });
      }
    });
  });

  // Update
  app.put('/cat/:id', (req, res) => {
    Cat.findById(req.params.id, (err, cat) => {
      if (err) {
        res.json({ result: errorWarning, error: err });
      }
      if (cat) {
        _.merge(cat, req.body);
        cat.save((error) => {
          if (error) {
            res.json({ result: errorWarning, error });
          }
          res.json({ result: 'Updated cat' });
        });
      } else {
        res.json({ result: 'Cat not found' });
      }
    });
  });

  // Delete
  app.delete('/cat/:id', (req, res) => {
    Cat.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.json({ result: errorWarning, err });
      } else {
        res.json({ result: 'Cat deleted' });
      }
    });
  });
};
