import React from "react";
import "../styles/category.css";

const categories = [
  {
    id: 1,
    name: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e"
  },
  {
    id: 2,
    name: "Fruits",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf"
  },
  {
    id: 3,
    name: "Dairy",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
  },
  {
    id: 4,
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307"
  },
  {
    id: 5,
    name: "Snacks",
    image:
      "https://images.unsplash.com/photo-1604908176997-4314bda58f4"
  },
  {
    id: 6,
    name: "Bakery",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff"
  }
];

const ShopByCategory = () => {
  return (
    <section className="category-section">
      <div className="category-header">
        <h2>Shop by Category</h2>
        <span>More →</span>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
