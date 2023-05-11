const User = require("../model/user");
const userService = require("../service/user_service");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = new User({ name, email, password });
    console.log("In POST user " + user);
    await userService.createUser(user);

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Email is mandatory");
    } else {
      const user = await userService.getUserByEmail(email);
      console.log("user " + user);
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).send(user);
    }
  } catch (error) {
    // console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};
