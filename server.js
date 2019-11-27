const express = require("express");
const exphbs = require("express-handlebars")
const morgan = require("morgan");
// const db = require("./modules/index")
const PORT = process.env.PORT || 4650;
const app = express();

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use(require("./controllers/staticController"))
//Listen
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});
