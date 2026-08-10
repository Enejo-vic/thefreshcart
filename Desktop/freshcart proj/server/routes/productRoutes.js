const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ==============================
// GET ALL PRODUCTS
// /api/products
// ==============================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    console.log("ALL PRODUCTS FOUND:", products.length);

    res.status(200).json(products);
  } catch (error) {
    console.error("PRODUCT API ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ==============================
// GET FEATURED PRODUCTS
// /api/products/featured
// ==============================

router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({
      featured: true,
    });

    console.log(
      "FEATURED PRODUCTS FOUND:",
      products.length
    );

    res.status(200).json(products);
  } catch (error) {
    console.error(
      "FEATURED PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

// ==============================
// GET TOP SELLING PRODUCTS
// /api/products/top-selling
// ==============================

router.get("/top-selling", async (req, res) => {
  try {
    const products = await Product.find({
      topSelling: true,
    });

    console.log(
      "TOP SELLING PRODUCTS FOUND:",
      products.length
    );

    res.status(200).json(products);
  } catch (error) {
    console.error(
      "TOP SELLING PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;