const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
  action: { type: String, required: true },
  date: { type: Date, required: true },
  actionBy: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
  description: { type: String },
});

module.exports = historySchema;
