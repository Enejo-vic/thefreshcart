import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/ProductSection.css";
import AddToCartButton from "../components/AddToCartButton";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products/featured")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="section">
      <div className="section-header">
        <h2>Featured Products</h2>
       
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
    </section>
  );
};

export default FeaturedProducts;
