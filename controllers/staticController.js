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
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            return next(err)
        }
        if (!user){
            return res.redirect("/login?invalidLogin=Incorrect email or password")
        }
        req.login(user, (err) => {
            if(err){
                return next(err)
            }
            return res.redirect("/user/dashboard")
        });
    })(req, res, next)
        // {
        //     successRedirect: "/dashboard",
        //     failureRedirect: 
        // })
});

router.get("/signup", (req, res) => {
    console.log(req.query)
    res.render("signup",{query:req.query})
})

// Successful user sign up, auto logins the user. Error msg if unsuccessful
router.post("/signup",
    (req, res) => {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            res.redirect(307, "/login")
        }).catch(() => {
            res.redirect("/signup?invalidRequest=Email already in use")
        });
    });

// Logout and redirect to app homepage
router.get("/logout", (req, res) => {
    req.logout() // Destroys the cookies/session
    res.redirect("/logout?success=Logged out. Bon appétit!")
});

//Retrieving user dashboard with corresponding data
router.get("/user/dashboard",
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }else{
            res.redirect("/login");
        }
    },
    (req, res) => {
    // sequelize call to the db to get all meals
        const dayId = moment().day() === 0 ? 7 : moment().day();
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
            // after receiving the meals from the db and assigning them to a variable * meals *
            // inside the function =>  res.render("dashboard", meals)
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
    //need to get user id from session here.
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
});

module.exports = router;