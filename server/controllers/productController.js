const Product = require("../models/Product");
const handleError = require("../utils/handleError");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return handleError(res, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, category, quantity, price } = req.body;
    const product = await Product.create({ name, description, category, quantity, price });
    return res.status(201).json(product);
  } catch (error) {
    return handleError(res, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, category, quantity, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, quantity, price },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };