import React, { useEffect, useState, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = React.memo(
  ({ item, onAddToCart, onAddToWishlist, isInCart, isInWishlist }) => {
    return (
      <div className="col-md-3 mb-4">
        <div className="card h-100 shadow-sm">
          <img
            src={item.images?.[0] || "https://via.placeholder.com/150"}
            className="card-img-top"
            alt={item.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text mb-1">Price: ${item.price}</p>
            <p className="card-text text-muted">
              Category: {item.category?.name || "N/A"}
            </p>
            <div className="mt-auto d-flex justify-content-between">
              <button
                className={`btn btn-sm ${
                  isInCart ? "btn-success" : "btn-primary"
                }`}
                onClick={() => onAddToCart(item)}
              >
                {isInCart ? "Added" : "Add to Cart"}
              </button>
              <button
                className={`btn btn-sm ${
                  isInWishlist ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => onAddToWishlist(item)}
              >
                {isInWishlist ? "Wishlisted ❤" : "❤ Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default function Product() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // Track cart and wishlist status
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "" });

  // Fetch products from API
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // Show toast for 2 seconds
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 2000);
  };

  // Toggle handlers
  const toggleCart = useCallback(
    (product) => {
      setCartItems((prev) => {
        const isAdded = prev.includes(product.id);
        const updated = isAdded
          ? prev.filter((id) => id !== product.id)
          : [...prev, product.id];
        showToast(
          `${product.title} ${isAdded ? "removed from" : "added to"} cart`
        );
        return updated;
      });
    },
    [setCartItems]
  );

  const toggleWishlist = useCallback(
    (product) => {
      setWishlistItems((prev) => {
        const isAdded = prev.includes(product.id);
        const updated = isAdded
          ? prev.filter((id) => id !== product.id)
          : [...prev, product.id];
        showToast(
          `${product.title} ${isAdded ? "removed from" : "added to"} wishlist`
        );
        return updated;
      });
    },
    [setWishlistItems]
  );

  // Filter products safely
  const filteredProducts = useMemo(() => {
    if (!searchText) return products;
    return products.filter((item) =>
      item.title?.toUpperCase().includes(searchText.toUpperCase())
    );
  }, [products, searchText]);

  // Render product cards
  const productList = useMemo(() => {
    return filteredProducts.map((item) => (
      <ProductCard
        key={item.id}
        item={item}
        onAddToCart={toggleCart}
        onAddToWishlist={toggleWishlist}
        isInCart={cartItems.includes(item.id)}
        isInWishlist={wishlistItems.includes(item.id)}
      />
    ));
  }, [filteredProducts, toggleCart, toggleWishlist, cartItems, wishlistItems]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="form-control"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Product grid */}
      <div className="row">{productList}</div>

      {/* Toast */}
      {toast.show && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-body">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
