const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/AuthController");
const User = require("../models/User");
const router = express.Router();

router.put(
  "/signup",
  [
    body("phone_no").custom((v) => {
      return User.findOne({ phone_no: v }).then((user) => {
        if (user) {
          Promise.reject("Phone no already exists");
        }
      });
    }),
    body("email").isEmail().normalizeEmail(),
    body("password").not().isEmpty(),
    body("fullname").not().isEmpty()
  ],
  signup
);

router.post(
  "/login",
  [body("phone_no").not().isEmpty(), body("password").not().isEmpty()],
  login
);

module.exports = router;
