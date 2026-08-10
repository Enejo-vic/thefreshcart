import React from "react";
import "../styles/hero.css";

const HeroBanner = () => {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-text">
          <h1>Get 20% OFF</h1>
          <p>On your first order</p>
          <span>Free shipping when you spend $50 or more.</span>

          <button className="hero-btn">Shop Now</button>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Grocery"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroBanner;
