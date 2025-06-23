import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

// Sample Product List (Replace with API)
const sampleProducts = [
  { id: 1, name: "T-Shirt", price: 299, stock: 20 },
  { id: 2, name: "Jeans", price: 999, stock: 15 },
  { id: 3, name: "Sneakers", price: 1999, stock: 8 },
  { id: 4, name: "Cap", price: 199, stock: 25 },
  { id: 5, name: "Watch", price: 1499, stock: 10 },
];

// Sample Cashier Info (Replace with real user data from backend)

const POS = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

 

  return (
    <div className="flex flex-col gap-6 px-4 lg:flex-row lg:px-6 py-4">
      {/* Left Section (Products) */}
      <div className="w-full lg:w-2/3">
        {/* Header with cashier info */}
        

        {/* Products Grid */}
        <h2 className="text-xl font-semibold mb-3">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <p className="text-xs text-gray-400 mb-2">
                In Stock: {product.stock}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white w-full py-1 text-sm rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Cart) */}
      <div className="w-full lg:w-1/3">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShoppingCart size={20} />
          Cart
        </h2>
        <div className="bg-white border rounded-lg p-4 shadow">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Cart is empty</p>
          ) : (
            <>
              <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-start border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-semibold flex justify-between">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default POS;
