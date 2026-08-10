import React, { useState } from "react";
import "../styles/Filters.css";

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(25);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Vegetables",
    "Fruits",
    "Herbs & Seasonings",
    "Dairy Products",
    "Beverages",
    "Snacks & Biscuits",
    "Home Cleaning",
  ];

  const handlePriceChange = (e) => {
    const value = Number(e.target.value); // ✅ fix type
    setPriceRange(value);
    onFilterChange({ price: value, categories: selectedCategories });
  };

  const handleCategoryChange = (category) => {
    let updated;

    if (selectedCategories.includes(category)) {
      updated = selectedCategories.filter((c) => c !== category);
    } else {
      updated = [...selectedCategories, category];
    }

    setSelectedCategories(updated);
    onFilterChange({ price: priceRange, categories: updated });
  };

  const handleClearFilters = () => {
    setPriceRange(25);
    setSelectedCategories([]);

    onFilterChange({
      price: 50, // reset max
      categories: [],
    });
  };

  return (
    <div className="filters-container">
      <h2 className="filter-title">Filters</h2>

      {/* Categories */}
      <div className="filter-section">
        <h3>Categories</h3>

        <div className="categories-list">
          {categories.map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="custom-checkbox"></span>
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="filter-section">
        <h3 className="price-title">Price Range</h3>

        <input
          type="range"
          min="0"
          max="50"
          value={priceRange}
          onChange={handlePriceChange}
          className="price-slider"
        />

        <div className="price-labels">
          <span>$0</span>
          <span>${priceRange}</span>
          <span>$50</span>
        </div>
      </div>

      {/* Clear */}
      <button className="clear-btn" onClick={handleClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default Filter;
