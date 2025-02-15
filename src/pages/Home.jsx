import axios from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function getProducts() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Please sign in first.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:3000/user/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Products Response:", res.data); // Debugging log
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {loading ? (
        <p className="text-gray-400">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg w-80">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-sm">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
