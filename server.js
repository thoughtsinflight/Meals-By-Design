//Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use sessions to keep track of user login status
const sess = {
    secret: 'd0 u Believe 1n M@gic',
    resave: true,
    saveUninitialized: false,
    cookie: {}
}
// Use secure cookies in production (because the site is https-enabled) & allow for testing in dev
if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session())

// Routes
app.use(staticRouter);
app.use("/api/ingredients", ingredientRouter);
app.use("/api/meals", mealRouter);
app.use("/api/days", dayRouter);
app.use("/api/", userRouter);

//Synchronize my schema
//This will blow out the seed data, so removing for api testing.
//{ force: process.env.NODE_ENV !== "production" }
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});
