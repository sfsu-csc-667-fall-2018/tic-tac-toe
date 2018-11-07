const express = require("express");

const router = express.Router();

router.get("/", (_, response) => {
  response.render("index");
});

router.get("/lobby", (_, response) => {
  response.render("lobby/index");
});

module.exports = router;
