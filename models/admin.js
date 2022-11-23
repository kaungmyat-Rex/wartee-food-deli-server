const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  Username: {
    type: String,
  },
  Password: {
    type: Number,
  },
});

module.exports = mongoose.model("admins", AdminSchema);
