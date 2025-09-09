import {useState, useEffect, useContext} from "react";
import { CartContext } from "../context/CartContext";

function Products(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {addToCart} = useContext(CartContext);

    useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);   

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="products-grid">
            {products.map((product) =>(
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-img"/>
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <button className="add-to-cart" 
                      onClick={()=>{addToCart(product)}}>
                        Add to Cart
                    </button>
                </div>)
            )}
        </div>
    );
}

export default Products;