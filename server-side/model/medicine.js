var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medicineSchema = new Schema({
  userId : String,
  yakname: String,
  hour: Number,
  minute: Number,
  ampm: String,
  selected : Boolean
});

module.exports = mongoose.model('medicine',medicineSchema);
