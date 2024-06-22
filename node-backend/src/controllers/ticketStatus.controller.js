const httpStatus = require('http-status');
const { ticketStatusService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const ApiError = require('../utils/ApiError');

const createTicketStatus = catchAsync(async (req, res) => {
  const ticketStatus = await ticketStatusService.createTicketStatus(req.body);
  res.status(httpStatus.CREATED).send(ticketStatus);
});

const getTicketStatuses = catchAsync(async (req, res) => {
  const ticketStatuses = await ticketStatusService.queryTicketStatuses();
  res.send(ticketStatuses);
});

const getTicketStatus = catchAsync(async (req, res) => {
  console.log('req.params.uid', req.params.uid);
  const ticketStatus = await ticketStatusService.getTicketStatusByUid(req.params.uid);
  if (!ticketStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket Status not found');
  }
  res.send(ticketStatus);
});

const updateTicketStatus = catchAsync(async (req, res) => {
  const ticketStatus = await ticketStatusService.updateTicketStatusByUid(req.params.uid, req.body);
  res.send(ticketStatus);
});

module.exports = {
  getTicketStatuses,
  createTicketStatus,
  getTicketStatus,
  updateTicketStatus,
};
