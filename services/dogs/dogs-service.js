const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dogs');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// root
app.get('/', (req, res) => {
  res.send('Hello World');
  res.end();
});

// this middleware will be executed for every request to the app
app.use((req, res, next) => {
  console.log('Time: %d', Date.now());
  next();
});

const dogRoutes = require('./dogs-routes.js')(app); // eslint-disable-line

const server = app.listen(3001, () => {
  console.log(`Server running at ${server.address().port}`);
});
