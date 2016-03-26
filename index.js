const express = require('express');
const app = express();

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

const cats = require('./cats.js')(app);

const server = app.listen(3000, () => {
  console.log(`Server running at ${server.address().port}`);
});
