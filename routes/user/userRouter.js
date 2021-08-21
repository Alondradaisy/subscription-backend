const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createUser, login } = require("./controller/userController");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/create-user", createUser);
router.post("/login", login);

router.put("./update-profile", passport.authenticate("jwt-user"), {
  session: false,
}),
  function (req, res) {
    res.send("Success!");
  };

router.get("/logout", function (req, res) {
  res.clearCookie("jwt-cookie");
  res.send("Logged out!");
});

module.exports = router;
