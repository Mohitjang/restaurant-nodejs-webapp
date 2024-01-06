const express = require("express");
const router = express.Router();

// Third party packages :-
const uuid = require("uuid");

// importing others files exports :-
const resData = require("../util/restaurant-data");

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  } 

  if (order === "desc"){
    nextOrder = "asc";
  }

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resA.name < resB.name)
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

// Dynamic route example:-
router.get("/restaurants/:id", function (req, res) {
  // for details pages for dynamic data:-
  // this route is helps us to load a specific restaurant by using it's id
  // domain.restaurants/rid
  const restaurantId = req.params.id;
  // getting data of restaurant which id is restaurantId
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurantId === restaurant.id) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  // sending an error response:- 404 file not found
  res.render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;

  // here we will use uuid feature to add uniqueness to our data:-
  restaurant.id = uuid.v4();

  const Restaurants = resData.getStoredRestaurants();
  Restaurants.push(restaurant);

  resData.storeRestaurant(Restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

//  exporting the router object:-
module.exports = router;
