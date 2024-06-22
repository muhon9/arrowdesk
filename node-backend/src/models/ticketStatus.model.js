/*
 *       .                             .o8                     oooo
 *    .o8                             "888                     `888
 *  .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo
 *    888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'
 *    888    888      888   888  888   888  888ooo888 `"Y88b.   888888.
 *    888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.
 *    "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o
 *  ========================================================================
 *  Author:     Chris Brame
 *  Updated:    1/20/19 4:43 PM
 *  Copyright (c) 2014-2019. All rights reserved.
 */

// var _               = require('lodash');
const mongoose = require('mongoose');
require('moment-duration-format');
const _ = require('lodash');
const { sanitizeFieldPlainText } = require('../utils');
const { toJSON } = require('./plugins');

const COLLECTION = 'TicketStatus';

const statusSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    htmlColor: { type: String, default: '#29b955' },
    uid: { type: Number, unique: true, index: true },
    order: { type: Number, index: true },
    slatimer: { type: Boolean, default: true },
    isResolved: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

statusSchema.pre('save', function (next) {
  // this.wasNew = this.isNew;
  this.name = sanitizeFieldPlainText(this.name.trim());

  if (!_.isUndefined(this.uid) || this.uid) {
    return next();
  }

  const c = require('./counter.model');
  const self = this;
  c.increment('status', function (err, res) {
    if (err) return next(err);

    self.uid = res.value.next;

    if (_.isUndefined(self.uid)) {
      const error = new Error('Invalid UID.');
      return next(error);
    }

    return next();
  });
});

statusSchema.plugin(toJSON);

module.exports = mongoose.model(COLLECTION, statusSchema);
