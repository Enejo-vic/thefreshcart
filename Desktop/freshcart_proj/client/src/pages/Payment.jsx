import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  const order = useMemo(
    () =>
      location.state || {
        items: [],
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
      },
    [location.state],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => navigate("/profile"), 1400);
  };

  if (success) {
    return (
      <section className="payment-page">
        <div className="payment-success-card">
          <h1>Payment Successful</h1>
          <p>Your order has been placed successfully.</p>
          <Link to="/profile" className="payment-link-btn">
            Go to Profile
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="payment-page">
      <div className="payment-container">
        <form className="payment-card" onSubmit={handlePlaceOrder}>
          <h1>Payment Details</h1>
          <input
            type="text"
            name="cardName"
            placeholder="Name on card"
            value={formData.cardName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <div className="payment-row">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="address"
            placeholder="Delivery address"
            value={formData.address}
            onChange={handleChange}
            rows={4}
            required
          />
          <button type="submit" className="payment-btn">
            Place Order
          </button>
        </form>

        <aside className="payment-summary">
          <h2>Order Summary</h2>
          {order.items.length === 0 ? (
            <p>
              No cart data found. <Link to="/cart">Go back to cart</Link>
            </p>
          ) : (
            <>
              <div className="summary-row">
                <span>Items</span>
                <span>{order.items.length}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
