const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  editedAt: { type: Date },
  comment: { type: String, required: true },
  deleted: { type: Boolean, default: false, required: true },
});

module.exports = commentsSchema;
