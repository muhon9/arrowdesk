const express = require('express');
const auth = require('../../middlewares/auth');
const customerController = require('../../controllers/customer.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createCustomer'), customerController.createCustomer)
  .get(auth('getCustomer'), customerController.getCustomers);

// router for bulk customer upload
router.route('/bulk').post(auth('createCustomer'), customerController.createBulkCustomers);

module.exports = router;
