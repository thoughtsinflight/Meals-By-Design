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

//post - create
//FINISH
router.post("/", async (req, res) => {
    //req.body.ingredients should be an array of objects of the format:
    // [{name: "flour"}, {name: "butter"}]
    //need to get user id from session here.
    const userId = 1;
    const { name: mealName, ingredients, dayId } = req.body;
    //Find Day
    const day = await Day.findByPk(dayId);
    //Find User
    const user = await User.findByPk(userId);
    //Find or Create meal
    const [meal] = await Meal.findOrCreate({
        where: { name: mealName }
    });

    await meal.setDay(day);
    await meal.setUser(user);

    ingredients.forEach(async (ingredient) => {
        const [focIngredient] = await Ingredient.findOrCreate({ where: ingredient });
        await meal.addIngredient(focIngredient);
    });

    const currentIngredients = await meal.getIngredients();
    res.send({ day, meal, currentIngredients });
});

//delete
router.delete("/:id", (req, res) => {
    Meal.findbyPK(req.params.id)
        .then(meal => (meal.destroy()))
        .then(() => (res.send("Meal destroyed!")));
});



module.exports = router;