const express = require('express');

const router = express.Router();
const { Test } = require('../db');

router.get('/', (_, response) => {
  Test.add()
    .then(_ => Test.all()) // eslint-disable-line
    .then(results => response.json(results))
    .catch(error => {
      response.json({ error });
    });
});
module.exports = router;
