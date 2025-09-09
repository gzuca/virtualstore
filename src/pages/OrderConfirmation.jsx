import React, {useEffect, useContext} from "react";
import {useLocation} from "react-router-dom";
import { CartContext } from "../context/CartContext";

function OrderConfirmation(){
    const location = useLocation();
    const {customer, cart, idorder} = location.state;

    const {clearCart} = useContext(CartContext);


    useEffect(()=>{
        clearCart();
    }, []);


    return(
        <div className="order-confirmation-container">
            <h1>Thank you for your order!</h1>
            <h2>Order ID: {idorder}</h2>

            <section className="customer-info">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Address:</strong> {customer.address}</p>
            </section>

            <h3>
                Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </h3>


        </div>
    )
}
export default OrderConfirmation;