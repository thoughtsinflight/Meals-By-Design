const passport = require("../config/passport");
const router = require("express").Router();
const db = require("../models/index");

const User = db.sequelize.import(path.resolve(__dirname, "../models/User.js"));

// Authentication middleware that works with localStrategy from passport
// Valid login will go to user dashboard. Invalid will redirect back to login page
// Password is hashed via user model setup
router.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    },
    (req, res) => {res.json(req.user);
    })
);

// Successful user sign up, auto logins the user. Error msg if unsuccessful
router.post("/signup", (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }).then( () => {
        res.redirect(307, "/api/login")
    }).catch( (err) => {
        res.status(401).json(err);
    });
});

// Logout and redirect to app homepage
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
});

// Route to collect user data for client side
// Used for sessions
router.get("/", (req, res) => {
    // When no valid user is logged in, send an empty object
    if(!req.user) {
        res.json({})
    } else {
    // For a logged in user, send everything & id EXCEPT password, even though it's hashed
        res.json({
            id: req.user.id,   //Auto created by Sequelize
            firstName: req.user.firstName,
            email: req.user.email
        });
    }
});

module.exports = router;