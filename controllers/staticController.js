const moment = require("moment");
const router = require("express").Router();
const passport = require("../config/passport");
const db = require("../models");
const path = require("path");

const Meal = db.sequelize.import(path.resolve(__dirname, "../models/meal.js"));
const Ingredient = db.sequelize.import(path.resolve(__dirname, "../models/ingredient.js"));
const User = db.sequelize.import(path.resolve(__dirname, "../models/user.js"));
const Day = db.sequelize.import(path.resolve(__dirname, "../models/day.js"));

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/login", (req, res) => {
    res.render("login")
})

// Authentication middleware that works with localStrategy from passport
// Valid login will go to user dashboard. Invalid will redirect back to login page
// Password is hashed via user model setup
router.post("/login",
    passport.authenticate("local"),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

router.get("/signup", (req, res) => {
    res.render("signUp")
})

// Successful user sign up, auto logins the user. Error msg if unsuccessful
router.post("/signup", (req, res) => {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }).then(() => {
        res.redirect(307, "/login")
    }).catch((err) => {
        console.log(err);
        res.status(401).end();
    });
});

// Logout and redirect to app homepage
router.get("/logout", (req, res) => {
    req.logout() // Destroys the cookies/session
    req.flash('success', "You're logged out now. Bon appétit!")
    res.redirect("/")
});

//Retrieving user dashboard with corresponding data
router.get("/dashboard",
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect("/login");
    },
    (req, res) => {
        const dayId = moment().day() === 0 ? 7 : moment().day();
        //const dayId = 4;
        const userId = req.user.id;
        Meal.findAll({
            include: [
                {
                    model: Ingredient,
                    as: "Ingredients"
                },
                {
                    model: Day,
                    as: "Day",
                    where: {
                        id: dayId
                    },
                },
                {
                    model: User,
                    as: "User",
                    where: {
                        id: userId
                    }
                }
            ],
            nest: true
        }).then((meals) => {
            const parsed = JSON.parse(JSON.stringify(meals));
            res.render("dashboard", {
                meals: parsed, helpers: {
                    json: function (ingredient) {
                        return JSON.stringify(ingredient);
                    },
                    name: function (data) {
                        return data.name;
                    }
                }
            });
        });
    })

router.get("/groceryList", (req, res) => {
    // sequelize call to the db to get all meals
    // after receiving the meals from the db and assigning them to a variable * meals *
    // inside the function =>  res.render("dashboard", meals)

    //need to get user id from session here.
    //const userId = 1;
    const userId = req.user.id;
    Meal.findAll({
        include: [
            {
                model: Ingredient,
                as: "Ingredients"
            },
            {
                model: User,
                as: "User",
                where: {
                    id: userId
                }
            }
        ],
        nested: true
    }).then((ingredients) => {
        const parsed = JSON.parse(JSON.stringify(ingredients));
        res.render("groceryList", {
            meals: parsed, helpers: {
                json: function (ingredient) {
                    return JSON.stringify(ingredient);
                },
                name: function (data) {
                    return data.name;
                }
            }
        });
    });
    // once the sequelize call is done, replace this dummyData variable below with the data object from the database
});

module.exports = router;