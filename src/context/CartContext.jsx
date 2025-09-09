import { createContext, useState } from "react";

//create context
export const CartContext = createContext();

//create proover
export function CartProvider({children}){
    const [cart, setCart] = useState([]);

//function to add product to cart
const addToCart = (product) => {
  setCart((prevCart) => {
    const existingProduct = prevCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si ya está en el carrito, aumenta la cantidad
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Si no está, lo agregamos con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

//function to remove a product from cart
const removeFromCart = (id) => {
  setCart((prevCart) => {
    const existingProduct = prevCart.find((item) => item.id === id);

    if (existingProduct.quantity > 1) {
      // Resta una cantidad
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      // Si la cantidad llega a 0, lo elimina del carrito
      return prevCart.filter((item) => item.id !== id);
    }
  });
};

const increaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0) // elimina si llega a 0
  );
};

//function to clear car

const clearCart = () =>{
  setCart([]);
}

//function to generate order id

const generateOrderId = (e) =>{
    let  randomnum = "";
    for (let i = 0; i<7; i++){
      randomnum += (Math.floor(Math.random()*10));
    }
    const orderid = `ORD - ${randomnum}`;
    return orderid;
  }

return(
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity,decreaseQuantity, clearCart,generateOrderId }}>
        {children}
    </CartContext.Provider>
);

}