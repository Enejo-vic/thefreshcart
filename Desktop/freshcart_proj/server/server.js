const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const connectDB = require("./config/db");

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());


// =========================================
// DATABASE CONNECTION
// =========================================

app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error(
      "DATABASE CONNECTION ERROR:",
      error
    );

    return res.status(503).json({
      message:
        "Database temporarily unavailable",
    });
  }
});


// =========================================
// API ROUTES
// =========================================

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);


// =========================================
// HEALTH CHECK
// =========================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "FreshCart API is running",
  });
});


// =========================================
// LOCAL SERVER
// =========================================

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `FreshCart server running on port ${PORT}`
    );
  });
}


// Vercel
module.exports = app;