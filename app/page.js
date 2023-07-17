"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

const HomePAge = () => {
  const [productForm, setProductForm] = useState({});

  // Sample stock data (you can replace this with your actual stock data)
  const stockData = [
    { id: 1, name: "Product A", quantity: 10, price: 25 },
    { id: 2, name: "Product B", quantity: 15, price: 30 },
    { id: 3, name: "Product C", quantity: 20, price: 15 },
  ];

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        console.log("Product added successfully!");
      } else {
        console.log("Failed to add product");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Header />
      {/* DISPLAY CURRENT STOCK */}
      <div className="container mx-auto bg-blue-200 px-5  my-10 md:p-10 rounded-lg">
        {/* SEARCH A PRODUCT */}
        <div className="container mx-auto  px-5 md:px-0 mt-4 py-8">
          <h1 className="text-2xl font-bold mb-2">Search a Product</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter product name"
              className="px-4 py-2 w-full border border-gray-300 rounded-l-md outline-none"
            />
            <select className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md outline-none">
              <option value="">Select quantity...</option>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        {/* ADD A NEW PRODUCT */}
        <h1 className="font-bold">Add a Product</h1>

        <form className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Slug
            </label>
            <input
              name="slug"
              onChange={handleChange}
              type="text"
              id="productName"
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              name="quantity"
              onChange={handleChange}
              type="number"
              id="quantity"
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              step="0.01"
              id="price"
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <button
            onClick={addProduct}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Product
          </button>
        </form>
        <h1 className="text-2xl font-bold pt-8 ">Current Stock</h1>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePAge;
