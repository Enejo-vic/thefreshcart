import React from "react";
import "../styles/promo.css";

const PromoBanner = () => {
  return (
    <section className="promo-banner">
      <div className="promo-content">
        <div className="promo-text">
          <h2>Get 30% Discount</h2>
          <p>On selected grocery items this week</p>
          <button>Shop Now</button>
        </div>

        <div className="promo-image">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Promo"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
