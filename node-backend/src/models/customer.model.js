const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const COLLECTION = 'Customer';

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    name: {
      type: String,
    },

    expDate: {
      type: String,
      default: null,
    },

    mobile: {
      type: String,
      trim: true,
      default: null,
    },

    created: {
      type: String,
    },

    address: {
      type: String,
    },

    area: {
      type: String,
      default: null,
    },

    pop: {
      type: String,
      default: null,
    },

    fiberId: {
      type: String,
      default: null,
    },

    fiberReading: {
      type: String,
      default: null,
    },

    fiberLength: {
      type: String,
      default: null,
    },

    latLong: {
      type: String,
      default: null,
    },

    power: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      default: null,
      lowercase: true,
    },

    connectedSplitter: {
      type: String,
      default: null,
      // require: true,
    },

    macaddress: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

module.exports = mongoose.model(COLLECTION, customerSchema);
