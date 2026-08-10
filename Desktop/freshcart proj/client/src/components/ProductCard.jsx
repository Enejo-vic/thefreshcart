import React from "react";
import "../styles/product.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p className="price">${product.price}</p>

      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
