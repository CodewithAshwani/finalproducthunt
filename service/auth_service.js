const User = require("../model/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.signup = async (name, email, password) => {
  console.log("In Auth SignUp  ");
  const user = new User({ name, email, password });
  await user.save();
  return user._id;
};

exports.login = async (email, inputPassword) => {
  console.log("In Auth login  ");
  const user = await User.findOne({ email, isActive: true }).select(
    "+password"
  );
  console.log("user " + user);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(inputPassword, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  console.log("token " + token);

  await User.findOneAndUpdate({ _id: user._id }, { token: token });

  return token;
};

exports.logout = async (id) => {
  console.log("In Auth logout ");
  const user = await User.findOne({ _id: id });
  user.token = null;
  await User.findOneAndUpdate({ _id: user._id }, { token: "" });
};

exports.verifyToken = async (token) => {
  console.log("In Auth verifyToken ");
  const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findOne({ _id: payload._id, isActive: true });
  if (!user) {
    throw new Error("User not found or deactivated");
  } else if (!user.token || user.token != token) {
    throw new Error("Access Denied. please login");
  }

  console.log("payload " + payload);
  return user;
};
