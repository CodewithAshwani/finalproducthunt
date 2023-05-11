const mongoose = require("mongoose");
const validator = require("../utils/validation_utils");
const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.validateAlphaNumeric(v);
      },
      message: (props) =>
        `${props.value} contains special characters, only alphanumeric characters and spaces are allowed!`,
    },
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
