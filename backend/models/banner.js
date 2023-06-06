const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  image: {data: Buffer,contentType: String}
  
});

module.exports = mongoose.model('Banner', bannerSchema);
