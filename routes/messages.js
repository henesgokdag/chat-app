const express = require("express");
const router = express.Router();

//libs
const Messages = require("../src/lib/Messages");

router.get("/list", function(req, res, next) {
  Messages.list("@Room:SsP_CY8l", messages => {
    res.json({ messages });
  });
});

module.exports = router;
