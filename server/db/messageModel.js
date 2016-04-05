var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  text: String
}, {timestamps: {createdAt: 'created_at'}});

module.exports = mongoose.model('Message', MessageSchema);
