const mongoose = require('mongoose');
const { sanitizeFieldPlainText } = require('../utils');
const { toJSON } = require('./plugins');

const COLLECTION = 'Tag';

/**
 * Tag Schema
 * @module models/tag
 * @class Tag

 *
 * @property {object} _id ```Required``` ```unique``` MongoDB Object ID
 * @property {String} name ```Required``` ```unique``` Name of Tag
 */
const tagSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  normalized: String,
});

tagSchema.plugin(toJSON);

tagSchema.pre('save', function (next) {
  this.name = sanitizeFieldPlainText(this.name.trim());
  this.normalized = sanitizeFieldPlainText(this.name.toLowerCase().trim());

  return next();
});

module.exports = mongoose.model(COLLECTION, tagSchema);
