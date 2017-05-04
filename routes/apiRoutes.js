// router.post("/", function(req, res){
//   //would be safer to validate input but time is little and I completely trust the user to not break my database;
//   var newBurger = req.body;
//   var cols = ["burger_name"];
//   var vals = [req.body.burger_name];
//   console.log("Adding Burger: " +req.body.burger_name);
//   burger.create(cols, vals, function(results){
//     res.redirect("/");
//   });
// });

// router.put("/:id", function(req, res){
//   var updatedBurger = req.body;
//   var colsVals ={
//     devoured: updatedBurger.devoured
//   };
//   var condition = "id = "+updatedBurger.id;
//   burger.update(colsVals, condition, function(results){
//     res.redirect("/");
//   });
// });

// router.delete("/:id", function(req, res){
//   burger.destroy(req.body.id, function(results){
//     res.redirect("/");
//   });
// });

var express = require("express");
var db = require("../models");

var router = express.Router();

router.post("/", function(req, res){
  var newBurger = {burger_name: req.body.burger_name};
  console.log("Adding Burger: " +req.body.burger_name);


  db.Burger.create(newBurger).then(function(dbBurger){
    res.json(dbBurger);
  });
});

router.put("/:id", function(req, res){
  var updateBurger = {
    devoured: req.body.devoured
  };
  db.Burger.update(updateBurger, {where: {id: req.params.id}}).then(function(dbBurger){
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res){
  db.Burger.destroy({where:{id: req.params.id}}).then(function(dbBurger){
    res.redirect("/");
  });
});


module.exports = router;