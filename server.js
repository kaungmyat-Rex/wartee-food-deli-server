const { response } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Usemodel = require("../server/models/menu");
const Adminmodel = require("../server/models/admin");
const orderList = require("../server/models/orderList");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://admin:wartee@cluster0.luh5ncd.mongodb.net/WarteeFoodOrder?retryWrites=true&w=majority"
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

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

// server host at

app.listen(3001, () => {
  console.log("server run on port 3001");
});
