const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const products = [
  {
    name: "Fresh Broccoli",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80",
    category: "Vegetables",
    featured: true,
    topSelling: true,
  },

  {
    name: "Red Apples",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    category: "Fruits",
    featured: true,
    topSelling: true,
  },

  {
    name: "Fresh Milk",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1576186726188-c9d70843790f?auto=format&fit=crop&w=800&q=80",
    category: "Dairy",
    featured: true,
    topSelling: true,
  },

  {
    name: "Bananas",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    category: "Fruits",
    featured: true,
    topSelling: true,
  },

  {
    name: "Fresh Carrots",
    price: 3.29,
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=80",
    category: "Vegetables",
    featured: true,
    topSelling: false,
  },

  {
    name: "Strawberries",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    category: "Fruits",
    featured: true,
    topSelling: true,
  },

  {
    name: "Avocados",
    price: 4.49,
    image:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80",
    category: "Fruits",
    featured: true,
    topSelling: true,
  },

  {
    name: "Fresh Tomatoes",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1546470427-e5ac89cd0b31?auto=format&fit=crop&w=800&q=80",
    category: "Vegetables",
    featured: true,
    topSelling: false,
  },

  {
    name: "Whole Wheat Bread",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    category: "Bakery",
    featured: true,
    topSelling: true,
  },

  {
    name: "Fresh Eggs",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80",
    category: "Dairy",
    featured: false,
    topSelling: true,
  },

  {
    name: "Orange Juice",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
    category: "Beverages",
    featured: true,
    topSelling: true,
  },

  {
    name: "White Rice",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    category: "Pantry",
    featured: false,
    topSelling: true,
  },

  {
    name: "Chicken Breast",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
    category: "Meat",
    featured: true,
    topSelling: true,
  },

  {
    name: "Cheddar Cheese",
    price: 6.49,
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80",
    category: "Dairy",
    featured: false,
    topSelling: true,
  },

  {
    name: "Fresh Potatoes",
    price: 4.79,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    category: "Vegetables",
    featured: true,
    topSelling: false,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Remove old products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    console.log(`${products.length} products seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedData();