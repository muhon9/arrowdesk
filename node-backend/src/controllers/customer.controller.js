const httpStatus = require('http-status');
const customerService = require('../services/customer.service');
const catchAsync = require('../utils/catchAsync');

const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const createCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.create(req.body);
  res.status(httpStatus.CREATED).send(customer);
});

const getCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const customers = await customerService.queryCustomers(filter, options);
  res.send(customers);
});

const createBulkCustomers = catchAsync(async (req, res) => {
  const returnData = await customerService.bulkCustomerCreate(req.body);
  res.send(returnData);
});

const getTicketStatus = catchAsync(async (req, res) => {
  console.log('req.params.uid', req.params.uid);
  const ticketStatus = await customerService.getTicketStatusByUid(req.params.uid);
  if (!ticketStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket Status not found');
  }
  res.send(ticketStatus);
});

const updateTicketStatus = catchAsync(async (req, res) => {
  const ticketStatus = await customerService.updateTicketStatusByUid(req.params.uid, req.body);
  res.send(ticketStatus);
});

module.exports = {
  getCustomers,
  createCustomer,
  getTicketStatus,
  updateTicketStatus,
  createBulkCustomers,
};
