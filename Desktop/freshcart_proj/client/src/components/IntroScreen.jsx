import "../styles/IntroScreen.css";
import React from "react";


function IntroScreen() {
  return (
    <div className="freshcart-intro">
      <div className="freshcart-intro-content">

        {/* Animated shopping cart */}
        <div className="intro-cart">
          <svg
            width="65"
            height="65"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3H5L7.5 14H17.5L20 7H6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="9"
              cy="19"
              r="1.5"
              fill="currentColor"
            />

            <circle
              cx="17"
              cy="19"
              r="1.5"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Store Name */}
        <h1 className="intro-store-name">
          FreshCart
        </h1>

        {/* Tagline */}
        <p className="intro-tagline">
          Fresh groceries, made simple.
        </p>

        {/* Loading bar */}
        <div className="intro-progress">
          <div className="intro-progress-bar"></div>
        </div>

        <p className="intro-loading-text">
          Preparing your fresh picks...
        </p>

      </div>
    </div>
  );
}

export default IntroScreen;