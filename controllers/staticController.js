const router = require("express").router();
router.get("/", (req,res) => {
    res.render("index")
})

module.exports = router;