var express = require("express");
var db = require("../models");

var router = express.Router();

router.get("/", function(req, res){
  db.Burger.findAll({}).then(function(dbBurgers){
    res.render("index", {burgers: dbBurgers});
  });
});

module.exports = router;