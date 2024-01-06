const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function storeRestaurant(storedRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurant: storeRestaurant,
};
