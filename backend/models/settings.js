const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  
  image: {data: Buffer,contentType: String}
  
});

module.exports = mongoose.model('Setting', settingsSchema);
