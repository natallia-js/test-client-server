const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: [
    {
      lang: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  photoLink: { type: String, required: true }
});

module.exports = model('Country', schema);
