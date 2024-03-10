const router = require("express").Router();
let Product = require("../models/product.model");

// Getting all data
router.route("/").get(async function (req, res) {
  try {
    const product = await Product.find({});
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Posting data into the DB
router.route("/").post(async function (req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Gettting specific data based on the id
router.route("/:id").get(async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update the DB
router.route("/:id").put(async function (req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete from the DB
router.route("/:id").delete(async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
