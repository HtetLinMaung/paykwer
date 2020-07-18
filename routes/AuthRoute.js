const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/AuthController");
const router = express.Router();

router.put(
  "/signup",
  [
    body("phone_no").not().isEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").not().isEmpty(),
    body("fullname").not().isEmpty()
  ],
  signup
);

router.post("/login", login);

module.exports = router;
