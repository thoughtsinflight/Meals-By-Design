const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Day = db.sequelize.import(path.resolve(__dirname, "../models/day.js"));

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
router.get("/:id", (req, res) => {
    Day.findByPk(req.params.id).then(day => (res.send(day)));
});

//get day by id and its associated meals
router.get("/:id/meals", (req, res) => {
    Day.findByPk(req.params.id)
        .then((day) => {
            day.getMeals()
                .then((meals) => {
                    const formattedDay = {}
                    formattedDay.id = day.id;
                    formattedDay.day = day.day;
                    formattedDay.meals = [];
                    for (let i = 0; i < meals.length; i++) {
                        formattedDay.meals.push({ id: meals[i].id, name: meals[i].name });
                    }
                    console.log(formattedDay);

                    res.send(formattedDay);
                })
        });
});

//post - create
router.post("/", (req, res) => {
    //req.body.meals should be an array of objects of the format:
    // [{name: "flour"}, {name: "butter"}]
    Day.findOrCreate({
        name: req.body.name,
        meals: req.body.meals
    }, {
        include: [{
            association: Day.Meals,
            include: [Day.Meals.Ingredients]
            
          }]
    }).then(day => {
        console.log(day);
        res.send(day)
    });
});

//put - update


//delete
router.delete("/:id", (req, res) => {
    Day.findbyPK(req.params.id)
        .then(day => (day.destroy()))
        .then(() => (res.send("Day destroyed!")));
});



module.exports = router;