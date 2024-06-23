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

// comment a ticket

const addComment = async (uid, userId, commentBody) => {
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  const comment = {
    ...commentBody,
    date: new Date(),
    owner: userId,
  };

  const historyObj = {
    action: 'ticket:add:comment',
    date: new Date(),
    actionBy: userId,
    description: `Comment was added to ticket`,
  };

  ticket.comments.push(comment);
  ticket.history.push(historyObj);
  await ticket.save();
  return ticket;
};

// edit a comment
const editComment = async (uid, userId, commentBody) => {
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  const { commentId } = commentBody;
  const comment = ticket.comments.id(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  if (comment.owner.toString() !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  comment.comment = commentBody.comment;
  comment.editedAt = new Date();
  const historyObj = {
    action: 'ticket:edit:comment  ',
    date: new Date(),
    actionBy: userId,
    description: `Comment ${commentId} was edited`,
  };
  ticket.history.push(historyObj);
  await ticket.save();
  return ticket;
};

// delete a comment

const deleteComment = async (uid, userId, commentId) => {
  console.log('userId', userId);
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  const comment = ticket.comments.id(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  if (comment.owner.toString() !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  comment.deleted = true;
  const historyObj = {
    action: 'ticket:delete:comment',
    date: new Date(),
    actionBy: userId,
    description: `Comment ${commentId} was deleted`,
  };
  ticket.history.push(historyObj);
  await ticket.save();
  return ticket;
};

// add a tag to a ticket
const addTag = async (uid, tags) => {
  const ticket = await getTicketByUid(uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  ticket.tags = tags;
  await ticket.save();
  return ticket;
};

module.exports = {
  createTicket,
  queryTickets,
  getTicketByUid,
  updateTicketByUid,
  deleteTicketByUid,
  permDeleteTicketByUid,
  restoreTicketByUid,
  assignTicket,
  addComment,
  editComment,
  deleteComment,
  addTag,
};
