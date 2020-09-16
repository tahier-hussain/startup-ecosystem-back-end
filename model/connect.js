const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ConnectSchema = new Schema({
  request_sent: {
    type: String,
    required: true
  },
  request_received: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  ignored: {
    type: Boolean,
    default: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Connect = mongoose.model("connect", ConnectSchema);
