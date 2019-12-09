const router = require("express").Router();
const db = require("../models/index");
const path = require("path");


const Meal = db.sequelize.import(path.resolve(__dirname, "../models/meal.js"));
const Ingredient = db.sequelize.import(path.resolve(__dirname, "../models/ingredient.js"));
const User = db.sequelize.import(path.resolve(__dirname, "../models/user.js"));

//get - read
router.get("/", (req, res) => {
    Ingredient.findAll().then(ingredients => (res.send(ingredients)));
});

router.get("/:id", (req, res) => {
    Ingredient.findbyPk(req.params.id).then(ingredient => (res.send(ingredient)));
});

//get All Ingredients for user
router.get("/user/grocery-list", async (req, res) => {
    //need to get user id from session here.
    const userId = req.user.id;
    const ingredients = await Ingredient.findAll({
        include: [ 
            {
                model: Meal,
                as: "Meal",
                include:[
                    {
                        model: User,
                        as: "User",
                        where: {
                            id: userId
                        }
                    }
                ]
                
            }
 
        ]
    });

    res.json({ ingredients });
});

module.exports = router;