// models/Request.js
const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  serviceType: { type: String, enum: ['Electrician', 'Plumber', 'Carpenter'], required: true },
  description: { type: String, required: true },
  roomNumber: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Successful'], default: 'Pending' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  servicePerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Request', requestSchema);
