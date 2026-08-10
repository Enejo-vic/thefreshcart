import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/cart.css";
import { getCart, saveCart } from "../utils/cartStorage";

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => getCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );
  const deliveryFee = items.length ? 2.0 : 0;
  const total = subtotal + deliveryFee;

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        items,
        subtotal,
        deliveryFee,
        total,
      },
    });
  };

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-list">
          <h1>Your Cart</h1>
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/products" className="cart-link-btn">
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article key={String(item.id)} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-item-actions">
                  <button type="button" onClick={() => updateQty(item.id, -1)}>
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(item.id, 1)}>
                    +
                  </button>
                </div>
                <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                <button type="button" className="cart-remove-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </article>
            ))
          )}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Proceed to Payment
          </button>
        </aside>
      </div>
    </section>
  );
}
