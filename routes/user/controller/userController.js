// async functions to log user entry
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const errHelper = require("../errHelper/errHelper");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    let createdUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    let genSalt = await bcrypt.genSalt(12);
    let securePassword = await bcrypt.hash(createdUser.password, genSalt);

    createdUser.password = securePassword;
    await createdUser.save();

    res.json({
      message: "Successfully created user",
    });
  } catch (e) {
    res.status(500).json({
      message: errHelper(e),
    });
  }
}

async function login(req, res) {
  try {
    let foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) {
      throw Error("User not found, please sign up!");
    }
    let comparedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!comparedPassword) {
      throw Error("Incorrect email and/or password. Please try again!");
    }

    let jwtToken = jwt.sign(
      {
        user: foundUser.username,
        email: foundUser.email,
      },
      process.env.JWT_USER_SECRET_KEY
    );

    res.cookie("jwt-cookie", jwtToken, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: false,
      secure: false,
    });

    res.json({
      user: {
        email: foundUser.email,
        username: foundUser.username,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: errHelper(e),
    });
  }
}

module.exports = {
  createUser,
  login,
};
