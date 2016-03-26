'use strict';

const request = require('request').defaults({
  json: true,
});
const async = require('async');

module.exports = function (app) {
  // Read all pets
  app.get('/pets', (req, res) => {
    // make two async calls to two seperate servers
    async.parallel([
      callback => {
        request({ uri: 'http://localhost:3002/cats' }, (error, response, body) => {
          if (error) {
            callback({ service: 'cats', error });
          }
          if (!error && response.statusCode === 200) {
            callback(null, body);
          } else {
            callback(response.statusCode);
          }
        });
      },
      callback => {
        request({ uri: 'http://localhost:3001/dogs' }, (error, response, body) => {
          if (error) {
            callback({ service: 'dogs', error });
          }
          if (!error && response.statusCode === 200) {
            callback(null, body);
          } else {
            callback(response.statusCode);
          }
        });
      },
    ],
      (error, results) => {
        if (error) {
          console.log('there is some sort of error...', error);
          res.json('Error', error);
        } else {
          console.log('No error at all!...');
          res.json({ error, results });
        }
      }
    );
  });
};
