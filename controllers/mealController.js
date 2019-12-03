const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Meal = db.sequelize.import(path.resolve(__dirname, "../models/meal.js"));

//get - read

//get all meals sans ingredients
router.get("/", (req, res) => {
    Meal.findAll().then(meals => (res.send(meals)));
});

//get all meals and all associated ingredients
router.get("/ingredients", (req, res) => {
    Meal.findAll().then(meals => (res.send(meals)));
});

//get meal individually by id
router.get("/:id", (req, res) => {
    Meal.findByPk(req.params.id).then(meal => (res.send(meal)));
});

//get meal by id and its associated ingredients
router.get("/:id/ingredients", (req, res) => {
    Meal.findByPk(req.params.id)
        .then((meal) => {
            meal.getIngredients()
                .then((ingredients) => {
                    const formattedMeal = {}
                    formattedMeal.id = meal.id;
                    formattedMeal.name = meal.name;
                    formattedMeal.ingredients = [];
                    for (let i = 0; i < ingredients.length; i++) {
                        formattedMeal.ingredients.push({ id: ingredients[i].id, name: ingredients[i].name });
                    }
                    console.log(formattedMeal);

                    res.send(formattedMeal);
                })
        });
});

//post - create
router.post("/", (req, res) => {
    Meal.findOrCreate({
        name: req.body.name,
        ingredients: req.body.ingredients
    }, {
        include: [{
            association: Meal.Ingredients
          }]
    }).then(meal => {
        console.log(meal);
        res.send(meal)
    });
});

//put - update


//delete
router.delete("/:id", (req, res) => {
    Meal.findbyPK(req.params.id)
        .then(meal => (meal.destroy()))
        .then(() => (res.send("Meal destroyed!")));
});



module.exports = router;