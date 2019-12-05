const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Day = db.sequelize.import(path.resolve(__dirname, "../models/day.js"));
const User = db.sequelize.import(path.resolve(__dirname, "../models/user.js"));
const Meal = db.sequelize.import(path.resolve(__dirname, "../models/meal.js"));
const Ingredient = db.sequelize.import(path.resolve(__dirname, "../models/ingredient.js"));
//get - read

//get all days sans meals
router.get("/", (req, res) => {
    Day.findAll().then(days => (res.send(days)));
});

//get all days and all associated meals
router.get("/meals", (req, res) => {
    Day.findAll().then(days => (res.send(days)));
});

//get day individually by id
router.get("/:id", async (req, res) => {
    const day = await Day.findByPk(req.params.id);
    res.send(day);
});

//get day by id and its associated meals
router.get("/:id/meals", async (req, res) => {
    //need to get user id from session here.
    const userId = 1;
    const meals = await Meal.findAll({
        include: [
            {
                model: Ingredient,
                as: "Ingredients"
            },
            {
                model: Day,
                as: "Day",
                where: {
                    id: req.params.id
                },
            },
            {
                model: User,
                as: "User",
                where:{
                    id:userId
                }
            }
        ]
    });

    res.json({ meals });
});


module.exports = router;