const { response, Router } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Usemodel = require("./menu");
// admin database
const Adminmodel = require("./admin");
const orderList = require("./orderList");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

mongoose.connect(
  "mongodb+srv://admin:wartee@cluster0.luh5ncd.mongodb.net/WarteeFoodOrder?retryWrites=true&w=majority"
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

require("./passport")(passport);

app.get("/getmenu", async (req, res) => {
  //   Usemodel.find({}, (err, result) => {
  //     if (err) {
  //       res.json(err);
  //     } else {
  //       res.json(result);
  //     }
  //   });

  const post = await Usemodel.find();
  console.log(post);
  res.json(post);
});

app.post("/createmenu", async (req, res) => {
  const product = req.body;
  const newProduct = new Usemodel(product);

  await newProduct.save();
  res.json(product);
});

app.patch("/edit/:id", async (req, res) => {
  const postID = req.params.id;
  const editProduct = req.body;
  const postUpdate = await Usemodel.findByIdAndUpdate(postID, editProduct);
  res.send(postUpdate);
});

app.delete("/delete/:id", async (req, res) => {
  const postID = req.params.id;
  const postdelete = await Usemodel.findByIdAndDelete(postID);
  res.send(postdelete);
});

app.get("/getmenu/:id", async (req, res) => {
  const productId = req.params.id;

  await Usemodel.findById(productId).then((e) => res.json(e));
});

// admin login route

app.get("/admin/getuser", async (req, res) => {
  const user = await Adminmodel.find();
  res.json(user);
});

//order list route
app.get("/admin/orders", async (req, res) => {
  const getorder = await orderList.find();
  res.json(getorder);
});

app.post("/admin/crateorder", async (req, res) => {
  const food = req.body;
  const newFood = new orderList(food);

  await newFood.save();
  res.json(food);
});

app.delete("/admin/delete/:id", async (req, res) => {
  const orderId = req.params.id;
  const orderDel = await orderList.findByIdAndDelete(orderId);
  res.json(orderDel);
});

app.post("/login", (req, res, next) => {
  // under line come from passport.js
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(false);
    else {
      res.send(true);
    }
  })(req, res, next);
});

// server host at
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log("server run on port 3001");
});
