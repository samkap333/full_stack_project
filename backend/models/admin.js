const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: false,
    set: function(password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt)
      return hash;
    }
  },
  userType: { type: String, enum: ['Admin', 'User'], default: 'Admin' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  actions: { type: [String], default: [] } 
});

module.exports = mongoose.model("Admin", adminSchema);
