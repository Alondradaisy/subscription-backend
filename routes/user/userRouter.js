const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createUser, login } = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", createUser);
router.post("/login", login);

module.exports = router;
