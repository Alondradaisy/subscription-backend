const express = require("express");
const router = express.Router();
const axios = require("axios");
const passport = require("passport");
const { createUser, login } = require("./controller/userController");

/* GET users listing. */
router.get("/", async (req, res) => {
  let data = await axios.get(
    "https://"
    {
      headers: {
        Accept: "application/json",
        "Authorization: Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc"
      },
    }
  );

  res.send("respond with a resource");
});

router.post("/create-user", createUser);
router.post("/login", login);

module.exports = router;
