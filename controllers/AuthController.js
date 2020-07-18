const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
      phone_no: req.body.phone_no,
      email: req.body.email,
      password: hashedPassword,
      fullname: req.body.fullname
    });

    const result = await user.save();
    let token;
    try {
      token = jwt.sign(
        { userId: result._id },
        "019a4c36da314a84c7c2390c5ff730af7847ad1b0f8d364ae793ee51a8a0e15de85462dd372eb25f8ddb5ef39475931c4107d229ba813e3689571cef8e828e54",
        {
          expiresIn: "1d"
        }
      );
    } catch (err) {
      err.statusCode = 500;
      next(err);
    }

    res.json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  const user = await User.findOne({ phone_no: req.body.phone_no });
  if (!user) {
    const error = new Error("Phone no with this user not found");
    error.statusCode = 401;
    next(error);
  }
  try {
    console.log(req.body.password);
    console.log(user.password);
    const isEqual = await bcrypt.compare(req.body.password, user.password);
    console.log(isEqual);
    if (!isEqual) {
      const error = new Error("Password incorrect");
      error.statusCode = 401;
      throw error;
    }
    res.json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
