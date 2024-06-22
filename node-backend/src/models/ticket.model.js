const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const { roles } = require('../config/roles');
const { toJSON, paginate } = require('./plugins');
const historySchema = require('./history.model');

const COLLECTION = 'tickets';

const ticketSchema = mongoose.Schema({
  uid: { type: String, unique: true, index: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    autopopulate: true,
  },
  //   group: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'groups',
  //   },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: { type: Date, default: Date.now, required: true, index: true },
  updated: { type: Date },
  deleted: { type: Boolean, default: false, required: true, index: true },
  // type: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'tickettypes',
  // },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TicketStatus',
    index: true,
  },

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
  history: [historySchema],
  //   subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'accounts' }],
});

ticketSchema.plugin(toJSON);
ticketSchema.plugin(paginate);

const autoPopulate = function (next) {
  // this.populate('status', 'name');
  this.populate([
    { path: 'status owner', select: 'name' },
    { path: 'assignee', select: 'name' },
  ]);

  return next();
};

ticketSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

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

ticketSchema.pre('findOneAndUpdate', async function (next) {
  this._original = await this.model.findOne(this.getQuery()).lean();
  this._update = this.getUpdate();
  next();
});

// Middleware to compare the document state after updating
ticketSchema.post('findOneAndUpdate', async function (doc) {
  if (this._original && this._update) {
    const original = this._original;
    const updates = this._update;
    const current = await this.model.findOne(this.getQuery()).lean();
    const changes = [];

    // Iterate over the keys in the update object
    Object.keys(updates).forEach((key) => {
      // Skip any MongoDB-specific update operators
      if (key.startsWith('$')) {
        Object.keys(updates[key]).forEach((field) => {
          if (current[field] !== original[field]) {
            changes.push({
              action: field,
              // oldValue: original[field],
              // newValue: current[field],
              date: new Date(),
              description: `Ticket ${field} updated from ${original[field]} to ${current[field]}`,
            });
          }
        });
      } else if (current[key] !== original[key]) {
        changes.push({
          action: key,
          date: new Date(),
          description: `Ticket ${key} updated from ${original[key]} to ${current[key]}`,
        });
      }
    });
    console.log('changes', changes);

    if (changes.length > 0) {
      // await this.model.findByIdAndUpdate(doc._id, { $push: { history: { $each: changes } } }, { skipHistoryUpdate: true });
      // eslint-disable-next-line no-param-reassign
      console.log('doc', doc);
      // doc.history = [...doc.history, ...changes];
    }
  }
});

module.exports = mongoose.model(COLLECTION, ticketSchema);
