const express = require("express");

const router = express.Router();

router.get("/register", (_, response) => {
  response.render("auth/register");
});

router.get("/login", (_, response) => {
  response.render("auth/login");
});

router.get("/logout", (_, response) => {
  // TODO: Do logout stuff here
  response.redirect("/");
});

module.exports = router;
