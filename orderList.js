const mongoose = require("mongoose");

const orderList = new mongoose.Schema({
  KBZph: {
    type: String,
  },
  KBZname: {
    type: String,
  },
  KBZpayslip: {
    type: String,
  },
  orderItemName: {
    type: Array,
  },
  totalfoodprice: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("orders", orderList);
