const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ticketService } = require('../services');

const createTicket = catchAsync(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);
  res.status(httpStatus.CREATED).send(ticket);
});

const getTickets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await ticketService.queryTickets(filter, options);
  res.send(result);
});

const getTicket = catchAsync(async (req, res) => {
  const ticket = await ticketService.getTicketByUid(req.params.uid);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  res.send(ticket);
});

const updateTicket = catchAsync(async (req, res) => {
  const ticket = await ticketService.updateTicketByUid(req.params.uid, req.body);
  res.send(ticket);
});

const deleteTicket = catchAsync(async (req, res) => {
  const ticket = await ticketService.deleteTicketByUid(req.params.uid);
  res.send(ticket);
});

const permDeleteTicket = catchAsync(async (req, res) => {
  await ticketService.permDeleteTicketByUid(req.params.uid);
  res.status(httpStatus.ACCEPTED).send({ message: 'Ticket deleted' });
});

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  permDeleteTicket,
};
