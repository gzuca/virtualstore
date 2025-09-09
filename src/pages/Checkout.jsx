// src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart, generateOrderId } = useContext(CartContext);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer Info:", customer);
    console.log("Cart:", cart);
    alert("Order placed successfully!");
    const idorder = generateOrderId();
    navigate("/orderconfirmation", {state: { customer, cart, idorder } });
  };


  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">CHECKOUT</h2>

      <div className="checkout-grid">
        {/* Formulario */}
        <div className="checkout-left">
          <div className="checkout-form">
            <h3>Customer Information</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit" className="checkout-btn fixed-bottom">
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* Carrito */}
        <div className="checkout-right">
          <h3>Your Order</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="checkout-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="checkout-img"
                  />
                  <span>{item.title}</span> -{" "}
                  <strong>${item.price.toFixed(2)}</strong> x {item.quantity} ={" "}
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
