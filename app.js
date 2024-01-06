// built in packages:-
const path = require("path");

// Third party packages :-
const express = require("express");

// importing others files exports :-
const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants")

// node.js app objects :-
const app = express();

// setting up the ejs engine:=
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middileware:-
// for making static files accessible by node as static, like css and js code.
app.use(express.static("public"));
// for filtering the request data :-
app.use(express.urlencoded({ extended: false }));

// for checling once in default routes:-
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);


//  custom middleware :- to handle wrong routes:-
app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.render("500");
});

app.listen(3000);
