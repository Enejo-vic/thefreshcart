import React, { useEffect, useState } from "react";
import api from "../api/api";
import AddToCartButton from "../components/AddToCartButton";
import Filter from "../components/Filters";
import "../styles/ProductSection.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    price: 50,
    categories: [],
  });

  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 6;

  // FETCH
  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(console.error);
  }, []);

  // FILTER HANDLER
  const handleFilterChange = (data) => {
    setFilters(data);
    setCurrentPage(1);
  };

  // SORT HANDLER
  const handleSort = (type) => {
    setSortType(type);
  };

  // FILTER + SORT
  useEffect(() => {
    let updated = [...products];

    // CATEGORY
    if (filters.categories.length > 0) {
      updated = updated.filter((p) => filters.categories.includes(p.category));
    }

    // PRICE
    updated = updated.filter((p) => p.price <= filters.price);

    // SORT
    if (sortType === "low") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortType === "high") {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortType === "featured") {
      updated = updated.filter((p) => p.featured === true);
    } else if (sortType === "top") {
      updated = updated.filter((p) => p.topSelling === true);
    }

    setFilteredProducts(updated);
  }, [filters, sortType, products]);

  // PAGINATION
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="shop-container">
      {/* MOBILE FILTER ICON */}
      <div className="mobile-filter-bar">
        <div className="hamburger" onClick={() => setShowFilters(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={`filter-sidebar ${showFilters ? "open" : ""}`}>
        <div className="filter-header">
          <h2>Filters</h2>

          {/* MOBILE CLOSE ONLY */}
          <span className="close-filter" onClick={() => setShowFilters(false)}>
            ✕
          </span>
        </div>

        <Filter onFilterChange={handleFilterChange} />
      </div>

      {/* OVERLAY */}
      {showFilters && (
        <div className="overlay" onClick={() => setShowFilters(false)} />
      )}

      {/* PRODUCTS */}
      <div className="products-section">
        <div className="products-header">
          <h2>All Products</h2>

          <select
            className="sort-dropdown"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="featured">Featured</option>
            <option value="top">Top Selling</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div className="card" key={product._id}>
                <div className="card-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="card-body">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>

                <AddToCartButton product={product} />
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          <span>{currentPage}</span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
