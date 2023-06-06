const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  date: { type: Date, default: Date.now },
  image: {data: Buffer,contentType: String},
  
  
});

module.exports = mongoose.model('Notification', notificationSchema);