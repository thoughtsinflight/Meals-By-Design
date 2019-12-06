const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Day = db.sequelize.import(path.resolve(__dirname, "../models/day.js"));
const User = db.sequelize.import(path.resolve(__dirname, "../models/user.js"));
const Meal = db.sequelize.import(path.resolve(__dirname, "../models/meal.js"));
const Ingredient = db.sequelize.import(path.resolve(__dirname, "../models/ingredient.js"));

//get day by id and its associated meals
router.get("/:id/meals", async (req, res) => {
    //need to get user id from session here.
    const userId = req.user.id;
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
                    id: userId
                }
            }
        ],
        nest: true
    });

    res.json({ meals });
});


module.exports = router;