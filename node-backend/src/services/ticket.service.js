const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const Ticket = require('../models/ticket.model');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}ticke
 */
const createTicket = async (ticketBody, userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  const ticket = new Ticket({ ...ticketBody });
  ticket.history = [{ action: 'ticket:created', date: new Date(), actionBy: userId, description: `Ticket was created` }];
  await ticket.save();
  return ticket;
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
  const ticket = await Ticket.findOne({ uid }).populate('owner name');
  return ticket;
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
  const ticket = await Ticket.findOneAndUpdate(
    { uid },
    { ...updateBody, updated: new Date() }, // Ensure the `updated` field is set
    { new: true } // Return the updated document
  );

  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }

  return ticket;
};

const deleteTicketByUid = async (uid) => {
  const ticket = await Ticket.findOneAndUpdate({ uid }, { deleted: true }, { new: true });
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }

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

const restoreTicketByUid = async (uid) => {
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  ticket.deleted = false;
  await ticket.save();
  return ticket;
};

// assgin a user to a ticket
const assignTicket = async (uid, assignee) => {
  const ticket = await Ticket.findOneAndUpdate({ uid }, { assignee }, { new: true });
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
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
  restoreTicketByUid,
  assignTicket,
};
