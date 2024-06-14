const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const Ticket = require('../models/ticket.model');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}ticke
 */
const createTicket = async (ticketBody) => {
  const newTicket = await Ticket.create(ticketBody);

  console.log(newTicket);
  return newTicket;
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
const queryTickets = async (filter, options) => {
  const tickets = await Ticket.paginate(filter, options);
  return tickets;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getTicketByUid = async (uid) => {
  return Ticket.findOne({ uid });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} uid
 * @param {Object} updateBody
 * @returns {Promise<Updated Ticket>}
 */
const updateTicketByUid = async (uid, updateBody) => {
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }

  Object.assign(ticket, updateBody);
  await ticket.save();
  return ticket;
};

const deleteTicketByUid = async (uid) => {
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  ticket.deleted = true;
  await ticket.save();
  return ticket;
};

/**
 * permenently Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const permDeleteTicketByUid = async (uid) => {
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  await ticket.remove();
  return ticket;
};

module.exports = {
  createTicket,
  queryTickets,
  getTicketByUid,
  getUserByEmail,
  updateTicketByUid,
  deleteTicketByUid,
  permDeleteTicketByUid,
};
