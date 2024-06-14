const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const { roles } = require('../config/roles');
const { toJSON, paginate } = require('./plugins');

const COLLECTION = 'tickets';

const ticketSchema = mongoose.Schema({
  uid: { type: String, unique: true, index: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  //   group: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'groups',
  //   },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  date: { type: Date, default: Date.now, required: true, index: true },
  updated: { type: Date },
  deleted: { type: Boolean, default: false, required: true, index: true },
  //   type: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'tickettypes',
  //   },
  //   status: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'statuses',
  //     index: true,
  //   },

  //   priority: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'priorities',
  //     required: true,
  //   },
  //   tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags', autopopulate: true }],
  subject: { type: String, required: true },
  issue: { type: String, required: true },
  //   closedDate: { type: Date },
  //   dueDate: { type: Date },
  //   comments: [commentSchema],
  //   notes: [noteSchema],
  //   attachments: [attachmentSchema],
  //   history: [historySchema],
  //   subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'accounts' }],
});

ticketSchema.plugin(toJSON);
ticketSchema.plugin(paginate);

ticketSchema.pre('save', function (next) {
  this.wasNew = this.isNew;

  if (!_.isUndefined(this.uid) || this.uid) {
    return next();
  }

  const c = require('./counter.model');
  const self = this;
  c.increment('tickets', function (err, res) {
    if (err) return next(err);

    self.uid = res.value.next;

    if (_.isUndefined(self.uid)) {
      const error = new Error('Invalid UID.');
      return next(error);
    }

    return next();
  });
});

module.exports = mongoose.model(COLLECTION, ticketSchema);
