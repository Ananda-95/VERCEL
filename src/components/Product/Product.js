import React, { useEffect, useState, useCallback, useMemo } from "react";
import { API_ENDPOINTS } from "../../config/api";
import "./products.css";

const ProductCard = React.memo(({ item, onAddToCart, onAddToWishlist }) => {
  console.log("Rendering:", item.name);

  return (
    <div className="product-card">
      <img src={item.image} alt={item.name} className="product-image" />

      <h3>{item.name}</h3>

      <p className="price">${item.price}</p>

      <p className="brand">{item.brand}</p>

      <div className="button-group">
        <button
          className="cart-btn"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </button>

        <button
          className="wishlist-btn"
          onClick={() => onAddToWishlist(item)}
        >
          ❤ Wishlist
        </button>
      </div>
    </div>
  );
});

export default function Product() {
  const [products, setProducts] = useState([]);

  /* Fetch Products */
  useEffect(() => {
    fetch(API_ENDPOINTS.PRODUCTS)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  /* Memoized Handlers */
  const addToCart = useCallback((product) => {
    console.log("Added to cart:", product);
  }, []);

  const addToWishlist = useCallback((product) => {
    console.log("Added to wishlist:", product);
  }, []);

  /* Memoized Product List */
  const productList = useMemo(() => {
    return products.map((item) => (
      <ProductCard
        key={item.product_id}
        item={item}
        onAddToCart={addToCart}
        onAddToWishlist={addToWishlist}
      />
    ));
  }, [products, addToCart, addToWishlist]);

  return <div className="product-container">{productList}</div>;
}
