const router = require("express").Router();
const passport = require("../config/passport");
const db = require("../models");

router.get("/", (req, res) => {
    res.render("index")
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/signUp", (req, res) => {
    res.render("signUp")
})
//router.get("/dashboard", passport.authenticate("local"), 
router.get("/dashboard", passport.authenticate("local"), 
(req, res) => {
    console.log("hello world")
    // sequelize call to the db to get all meals for the user
    db.UserMeals.findAll({
        where: {
            email: req.user.email
        }
    })
    .then(meals => {
        // once the sequelize call is done, display associate meals to dashboard
        res.render("dashboard", meals)
    })
})

module.exports = router;