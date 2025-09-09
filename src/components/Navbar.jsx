import { Link } from "react-router-dom";

function NavBar (){
    return(
        <nav>
          <Link className="to-home"to="/">Home</Link> |{" "}
          <Link className="to-cart" to="/cart">Cart</Link> |{" "}
          <Link className="to-checkout" to="/checkout">Checkout</Link>
        </nav>
    )
}

export default NavBar;