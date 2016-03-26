const mongoose = require('mongoose');

const catSchema = mongoose.Schema({ // eslint-disable-line
  name: String,
  age: { type: Number, required: true },
});

module.exports = mongoose.model('Cat', catSchema);
