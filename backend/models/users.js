const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true },
  nric: { type: Number, required: true, unique: true },
  refferal: { type: Number, required: true, unique: true },
  bankname: { type: String, required: true },
  accountname: { type: String, required: true },
  accountNumber: { type: Number, required: true, unique: true },
  image: {data: Buffer,contentType: String},
  location: { type: String, required: true },
  userType: { type: String, enum: ['Admin', 'User'], default: 'User' }

});

module.exports = mongoose.model("User", userSchema);
