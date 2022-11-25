const mongoose = require("mongoose");

const notFoundingre = "! Ingredient not found on database ";
const MenuSchema = new mongoose.Schema({
  typeFood: {
    type: String,
  },
  price: {
    type: Number,
  },

  imageLink: {
    type: String,
  },
  desc: {
    type: String,
  },

  ingre: {
    type: String,
    default: notFoundingre,
    set: (ingre) => (ingre === "" ? notFoundingre : ingre),
  },
});

module.exports = mongoose.model("Foodmenus", MenuSchema);
