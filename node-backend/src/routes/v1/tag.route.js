const express = require('express');
const auth = require('../../middlewares/auth');

const tagController = require('../../controllers/tag.controller');

const router = express.Router();

router.route('/').post(auth('manageTickets'), tagController.createTag).get(auth('getTickets'), tagController.getAllTags);

router
  .route('/:id')
  .get(auth('getTickets'), tagController.getTagById)
  .patch(auth('manageTickets'), tagController.updateTag)
  .delete(auth('manageTickets'), tagController.deleteTag);

module.exports = router;
