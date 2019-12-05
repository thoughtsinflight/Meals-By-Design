const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Ingredient = db.sequelize.import(path.resolve(__dirname, "../models/ingredient.js"));

//get - read
router.get("/", (req, res) => {
    Ingredient.findAll().then(ingredients => (res.send(ingredients)));
});

router.get("/:id", (req, res) => {
    Ingredient.findbyPK(req.params.id).then(ingredient => (res.send(ingredient)));
});

//post - create
router.post("/", (req, res) => {
    Ingredient.findOrCreate({ name: req.body.name }).then(ingredient => {
        console.log(ingredient);
        res.send(ingredient)
    });
});


//delete
router.delete("/:id", (req, res) => {
    Ingredient.findbyPK(req.params.id)
    .then(ingredient => (ingredient.destroy()))
    .then(() => (res.send("Ingredient destroyed!")));
});



module.exports = router;