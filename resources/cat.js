const mongoose = require('mongoose');

const catSchema = mongoose.Schema({ // eslint-disable-line
  name: String,
  age: Number,
});

module.exports = mongoose.model('Cat', catSchema);
