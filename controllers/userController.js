const router = require("express").Router();

// Route to collect user data for client side
// Used for sessions
router.get("/me", (req, res) => {
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
