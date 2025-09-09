import { useContext} from "react";
import {Link} from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>This is your Cart</h2>

      {cart.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        <>
          {/* Encabezados estilo tabla */}
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span></span>
          </div>

          {/* Filas de productos */}
          {cart.map((item, index) => (
            <div key={index} className="incart-product">
              <div className="incart-product-info">
                <img src={item.image} alt={item.title} className="incart-picture" />
                <span className="incart-title">{item.title}</span>
              </div>

              <div className="incart-price">${item.price.toFixed(2)}</div>

              <div className="incart-quantity">
                <button onClick={() => decreaseQuantity(item.id)}>➖</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>➕</button>
              </div>

              <div className="incart-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="incart-remove-button"
              >
                ❌
              </button>
            </div>
          ))}
        </>
      )}

      {/* Total */}
      <div className="cart-total">
        {cart.length > 0 && (
          <h3>
            Total: $
            {cart
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>
        )}
      </div>

        <div className="cart-total">
            {cart.length > 0 && (
                <>
                <h3>
                    Total: $
                    {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                </h3>
                <Link to="/checkout" className="checkout-btn">
                    Proceed to Checkout
                </Link>
                </>
            )}
        </div>
    </div>

    
  );
}

export default Cart;
