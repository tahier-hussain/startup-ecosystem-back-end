const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  user_type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  address_landmark: {
    type: String,
    required: false
  },
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  verified: {
    type: Array
  },
  certificates: {
    type: Array,
    required: false
  },
  connections: {
    type: Array,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
