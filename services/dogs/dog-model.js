const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({ // eslint-disable-line
  name: String,
  age: { type: Number, required: true },
});

module.exports = mongoose.model('Dog', dogSchema);
