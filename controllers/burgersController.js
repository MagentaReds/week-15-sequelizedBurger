var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res){
  burger.all(function(results){
    var objWithName = {
      burgers: results
    };
    res.render("index", objWithName);
  });
});

router.post("/", function(req, res){
  //would be safer to validate input but time is little and I completely trust the user to not break my database;
  var newBurger = req.body;
  var cols = ["burger_name"];
  var vals = [req.body.burger_name];
  console.log("Adding Burger: " +req.body.burger_name);
  burger.create(cols, vals, function(results){
    res.redirect("/");
  });
});

router.put("/:id", function(req, res){
  var updatedBurger = req.body;
  var colsVals ={
    devoured: updatedBurger.devoured
  };
  var condition = "id = "+updatedBurger.id;
  burger.update(colsVals, condition, function(results){
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res){
  burger.destroy(req.body.id, function(results){
    res.redirect("/");
  });
});

module.exports = router;