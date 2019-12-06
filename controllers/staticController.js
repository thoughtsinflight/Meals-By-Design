const router = require("express").Router();
const passport = require("../config/passport");
const db = require("../models");

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
    res.render("signup")
})

// Successful user sign up, auto logins the user. Error msg if unsuccessful
router.post("/signup", (req, res) => {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }).then( () => {
        res.redirect(307, "/login")
    }).catch( (err) => {
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
        if(req.isAuthenticated()) {
            return next()
        }else{
            res.redirect("/login");
            $("#errMsg").text("Incorrect email and/or password entered.")
        }
    },
    (req, res) =>{
        // sequelize call to the db to get all meals for the user
        db.UserMeals.findAll({
            where: {
                UserId: req.user.id
            }
        })
        .then(meals => {
            // once the sequelize call is done, display associated meals to dashboard
            res.render("dashboard", meals)
        })
})


// MUST BE LAST. Safety net catch-all route for the clowns who try entering bad routes.
router.get("*", (req, res) => {
    res.render("index")
});

module.exports = router;