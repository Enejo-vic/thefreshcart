import { useEffect, useState } from "react";
import api from "../api/api";
import AddToCartButton from "../components/AddToCartButton";
import "../styles/ProductSection.css";

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products/top-selling")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="section">
      <div className="section-header">
        <h2>Top Selling Products</h2>
       
      </div>
       
      

      <div className="grid">
        {products.map((product) => (
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
        ))}
      </div>

       <span className="more">More →</span>
    </section>
  );
};

export default TopSellingProducts;
