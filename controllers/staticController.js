const router = require("express").Router();

router.get("/", (req,res) => {
    res.render("index")
})
router.get("/login", (req,res) => {
    res.render("login")
})
router.get("/signUp", (req,res) => {
    res.render("signUp")
})
router.get("/dashboard", (req,res) => {

    res.render("dashboard",{
        id: 5,
        name: "cake",
        ingredients: [
            {name: "butter"},
            {name: "eggs"},
            {name: "floor"},
            {name: "sugar"}
        ]
    });
})

module.exports = router;