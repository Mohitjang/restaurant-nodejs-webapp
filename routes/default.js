const express = require("express");
const router = express.Router();

// router is almost same as the app object but it does lilbit more than app 
// and also we don't want more than 1 app object in our application and router solves that problem:-

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;
