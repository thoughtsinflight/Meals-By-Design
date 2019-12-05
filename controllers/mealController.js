const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Meal = db.sequelize.import(path.resolve(__dirname, "../models/meal.js"));
const Ingredient = db.sequelize.import(path.resolve(__dirname, "../models/ingredient.js"));
const Day = db.sequelize.import(path.resolve(__dirname, "../models/day.js"));
const User = db.sequelize.import(path.resolve(__dirname, "../models/user.js"));

//get - read

//get all meals sans ingredients
router.get("/", (req, res) => {
    Meal.findAll().then(meals => (res.send(meals)));
});

//get meal individually by id
router.get("/:id", (req, res) => {
    Meal.findByPk(req.params.id).then(meal => (res.send(meal)));
});

//get meal by id and its associated ingredients
router.get("/:id/ingredients", async (req, res) => {
    const meal = await Meal.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: Ingredient,
                as: "Ingredients"
            }
        ]
    });

    res.json({ meal });
});


module.exports = router;