const httpStatus = require('http-status');
const Tag = require('../models/tag.model');
const ApiError = require('../utils/ApiError');

const tagService = {};

tagService.create = async (tag) => {
  console.log('tag');
  const newTag = new Tag(tag);
  await newTag.save();
  console.log('hello', newTag);
  return newTag;
};

tagService.update = async (tagId, tagBody) => {
  const updatedTag = await Tag.findOneAndUpdate(
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

tagService.delete = async (tagId) => {
  return Tag.findByIdAndDelete(tagId).exec();
};

tagService.getAllTags = async () => {
  return Tag.find();
};

tagService.getTagByName = async (tagName) => {
  Tag.findOne({
    name: tagName,
  });
};

tagService.getTagById = async (tagId) => {
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

module.exports = tagService;
