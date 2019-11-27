const express = require("express");
const exphbs = require("express-handlebars")
const db = require("./modules/index")
const PORT = process.env.PORT || 8080;
const app = express();

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
