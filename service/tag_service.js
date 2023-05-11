const Tag = require("../model/tag");

exports.createTag = async (tag) => {
  await tag.save();
  console.log("Tag created successfully 1", tag);
};

exports.getTagById = async (id) => {
  return await Tag.findOne({ _id: id });
};

exports.getAllTags = async () => {
  return await Tag.find();
};
