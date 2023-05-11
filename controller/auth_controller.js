const { response } = require("express");
const User = require("../model/user");
const authService = require("../service/auth_service");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  console.log("In POST register User ");
  try {
    const { name, email, password } = req.body;
    const _id = await authService.signup(name, email, password);
    // console.log("user " + user);
    res.status(201).send({ id: _id });
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  console.log("In POST login User ");
  try {
    const { email, password: inputPassword } = req.body;
    // console.log("In POST login User ", email, inputPassword);

    const token = await authService.login(email, inputPassword);

    res.status(200).send({ token: token });
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    let loggedInUser = req.loggedInUser;

    await authService.logout(loggedInUser._id);
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    console.log("In verifyToken ", req.headers);
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      throw new Error({ message: "Access Denied. Please send Token" });

    const token = authHeader.split(" ")[1];
    if (!token)
      throw new Error({ message: "Access Denied. Please send Token" });
    console.log("token " + token);

    const user = await authService.verifyToken(token);
    req.loggedInUser = user;
    next();
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};
