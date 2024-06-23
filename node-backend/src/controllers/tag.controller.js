const { add } = require('winston');
const tagService = require('../services/tag.service');
const catchAsync = require('../utils/catchAsync');
const { addTag } = require('../services/ticket.service');

const createTag = catchAsync(async (req, res) => {
  const tag = await tagService.create(req.body);
  res.send(tag);
});

const getAllTags = catchAsync(async (req, res) => {
  const tags = await tagService.getAllTags();
  res.send(tags);
});

const getTagByName = catchAsync(async (req, res) => {
  const tag = await tagService.getTagByName(req.params.name);
  res.send(tag);
});

const getTagById = catchAsync(async (req, res) => {
  const tag = await tagService.getTagById(req.params.id);
  res.send(tag);
});

const updateTag = catchAsync(async (req, res) => {
  const tag = await tagService.update(req.params.id, req.body);
  res.send(tag);
});

const deleteTag = catchAsync(async (req, res) => {
  const tag = await tagService.delete(req.params.id);
  res.send(tag);
});

module.exports = {
  createTag,
  getAllTags,
  getTagByName,
  getTagById,
  updateTag,
  deleteTag,
};
