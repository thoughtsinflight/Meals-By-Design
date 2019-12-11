//Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");

//Requiring dev npm packages
const morgan = require("morgan");

//Getting passport as configured
const passport = require("./config/passport");

//importing routers (please don't move -- best practice for imports to be at top of file grouped together)
const staticRouter = require("./controllers/staticController");
const ingredientRouter = require("./controllers/ingredientController");
const mealRouter = require("./controllers/mealController");
const dayRouter = require("./controllers/dayController");
const userRouter = require("./controllers/userController");
const db = require("./models/index");

//Port setup and requiring db model for syncing
const PORT = process.env.PORT || 4650;


//Setting up express app and its middleware
const app = express();
//static assets
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

// Use sessions to keep track of user login status
const s = {
    secret: "d0 u Believe 1n M@gic",
    resave: false,
    saveUninitialized: false,
    cookie: {}
};
// Use secure cookies in production (because the site is https-enabled) & allow for testing in dev
if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    s.cookie.secure = true
}
app.use(session(s));

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(passport.session())

// Routes
app.use(staticRouter);
app.use("/api/ingredients", ingredientRouter);
app.use("/api/meals", mealRouter);
app.use("/api/days", dayRouter);
app.use("/api/users", userRouter);

// MUST BE LAST. Safety net catch-all route for the clowns who try entering bad routes.
app.use("*", (req, res) => {
    res.render("index")
});

//Synchronize my schema
db.sequelize.sync({ force: process.env.NODE_ENV !== "production" }).then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});
