import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    axios
      .get("https://back-end-intragation.onrender.com/user/products", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => {
        alert("Failed to fetch products");
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <main className="w-full h-full text-white">
        <div className="container flex justify-center items-center bg-gray-900 text-white">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg w-80">
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
