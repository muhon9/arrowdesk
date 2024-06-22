const httpStatus = require('http-status');
const { get } = require('mongoose');
const { User, TicketStatus } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createTicketStatus = async (ticketStatusBody) => {
  return TicketStatus.create(ticketStatusBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTicketStatuses = async (filter, options) => {
  const ticketStatuses = await TicketStatus.find().sort({ order: 1 });
  return ticketStatuses;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getTicketStatusById = async (id) => {
  return TicketStatus.findById(id);
};

/**
 * Get user by email
 * @param {string} Uid
 * @returns {Promise<User>}
 */
const getTicketStatusByUid = async (uid) => {
  return TicketStatus.findOne({ uid });
};

const updateTicketStatusByUid = async (uid, updateBody) => {
  const ticketStatus = await getTicketStatusByUid(uid);
  if (!ticketStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket Status not found');
  }
  Object.assign(ticketStatus, updateBody);
  await ticketStatus.save();
  return ticketStatus;
};

module.exports = {
  createTicketStatus,
  queryTicketStatuses,
  getTicketStatusById,
  getTicketStatusByUid,
  updateTicketStatusByUid,
};
