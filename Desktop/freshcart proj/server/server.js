const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

/* =========================================
   DATABASE
========================================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/* =========================================
   ROUTES
========================================= */

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "FreshCart API is running",
  });
});

/* =========================================
   ERROR HANDLER
========================================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

/* =========================================
   LOCAL DEVELOPMENT
========================================= */

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`FreshCart server running on port ${PORT}`);
  });
}

/* =========================================
   VERCEL EXPORT
========================================= */

module.exports = app;