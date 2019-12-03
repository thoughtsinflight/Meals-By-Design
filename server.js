//Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

//Getting passport as configured
const passport = require("./config/passport");

//Requiring dev npm packages
const morgan = require("morgan");

//Port setup and requiring db model for syncing
const PORT = process.env.PORT || 4650;
const db = require("./models/index");

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
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
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
app.use(require("./controllers/staticController"));

app.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        res.redirect('/');
    });

//Synchronize my schema
db.sequelize.sync({ force: process.env.NODE_ENV !== "production" }).then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on: http://localhost:" + PORT);
    });
})
