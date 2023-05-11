const mongoose = require("mongoose");
const User = require("../model/user");

exports.createUser = async (user) => {
  await user.save();
  console.log("User created successfully 1", user);
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};
