const _ = require('lodash');

module.exports = function (app) {
  const _cats = [];

  // Create
  app.post('/cat', (req, res) => {
    _cats.push(req.body);
    res.json({ result: 'cat created successfully' });
  });

  // Read
  // All
  app.get('/cats', (req, res) => {
    res.send(_cats);
  });

  // Just one
  app.get('/cat/:id', (req, res) => {
    res.send(
      _.find(
        _cats,
        {
          name: req.params.id,
        }
      )
    );
  });

  // Update
  app.put('/cat/:id', (req, res) => {
    const index = _.findIndex(
      _cats, {
        name: req.params.id,
      }
    );
    _.merge(_cats[index], req.body);
    res.json({ result: 'cat updated successfully' });
  });

  // Delete
  app.delete('/cat/:id', (req, res) => {
    _.remove(_cats, cat => cat.name === req.params.id);
    res.json({ result: 'cat removed successfully' });
  });
};
