const CART_KEY = "freshcartCart";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("freshcart-cart-updated"));
}

export function cartItemCount() {
  return getCart().reduce((sum, item) => sum + (item.qty || 0), 0);
}

export function addToCart({ id, name, price }) {
  const items = getCart();
  const key = String(id);
  const numPrice = Number(price);
  const idx = items.findIndex((i) => String(i.id) === key);
  if (idx >= 0) {
    items[idx] = { ...items[idx], qty: (items[idx].qty || 1) + 1 };
  } else {
    items.push({ id: key, name, price: numPrice, qty: 1 });
  }
  saveCart(items);
}
