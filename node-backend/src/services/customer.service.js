const httpStatus = require('http-status');
const Customer = require('../models/customer.model');
const ApiError = require('../utils/ApiError');
const Tag = require('../models/tag.model');

const customerService = {};

customerService.create = async (customerBody) => {
  const newCustomer = new Customer(customerBody);
  await newCustomer.save();

  return newCustomer;
};

customerService.queryCustomers = async (filter, options) => {
  const customers = await Customer.paginate(filter, options);
  return customers;
};

// Bulk create customers
customerService.bulkCustomerCreate = async (dataArray) => {
  const savedObjects = [];
  const failedObjects = [];
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const dataObject of dataArray) {
      try {
        const { username } = dataObject;
        // console.log("dataObject", dataObject);
        const existingData = Customer.findOne({ username }); // Assuming key1 is the identifier

        if (existingData) {
          failedObjects.push({
            ...dataObject,
            reason: 'Customer already exists in database',
          });
        } else {
          const newData = new Customer({
            ...dataObject,
            address: `${dataObject.flat || ''} ${dataObject.house || ''}, ${dataObject.road || ''}`,
          });
          newData.save();
          savedObjects.push(dataObject);
        }
      } catch (error) {
        failedObjects.push({
          ...dataObject,
          reason: `MongoDB Error: ${error.message}`,
        });
      }
    }

    const responseMessage = failedObjects.length ? `Some objects failed to save.` : `All objects saved successfully.`;

    return {
      message: responseMessage,
      savedObjects,
      failedObjects,
    };
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
};

customerService.update = async (tagId, tagBody) => {
  const updatedTag = await Customer.findOneAndUpdate(
    {
      _id: tagId,
    },
    tagBody,
    {
      new: true,
    }
  );
  return updatedTag;
};

customerService.delete = async (tagId) => {
  return Tag.findByIdAndDelete(tagId).exec();
};

customerService.getTagByName = async (tagName) => {
  Tag.findOne({
    name: tagName,
  });
};

customerService.getTagById = async (tagId) => {
  try {
    const tag = await Tag.findOne({ _id: tagId });
    if (!tag) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
    }
    return tag;
  } catch (error) {
    // If the error is because of an invalid ObjectId or any other reason, rethrow it as a 'Tag not found' error.
    // You might want to check the error type here to differentiate between different kinds of errors.
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
  }
};

module.exports = customerService;
