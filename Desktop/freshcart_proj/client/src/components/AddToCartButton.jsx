import { useState } from "react";
import { addToCart } from "../utils/cartStorage";

export default function AddToCartButton({ product }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    if (!product?._id) return;
    addToCart({
      id: String(product._id),
      name: product.name,
      price: product.price,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <button type="button" onClick={handleClick}>
      {justAdded ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
