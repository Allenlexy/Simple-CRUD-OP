const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product.model");
const productRouter = require("./routes/product.route");
const app = express();

require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo db database connection established successfully");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

app.use("/products", productRouter);

app.get("/", function (req, res) {
  res.send("Its Allen L Koickal");
});
