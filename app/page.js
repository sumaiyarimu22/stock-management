"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

const HomePAge = () => {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [dropdown, setDropdown] = useState([
    {
      _id: "64b57a9b13a384fe1ccf0125",
      slug: "pant",
      quantity: "7",
      price: "467",
    },
    {
      _id: "64b5800613a384fe1ccf0126",
      slug: "Tshirt",
      quantity: "34",
      price: "2334",
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

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
        setAlert("Your Product has been added");
        setProductForm({});
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

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value);
    if (!loading) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query=" + query);
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="text-green-700 text-center">{alert}</div>

      <div className="container mx-auto  px-5  my-10 md:p-10 rounded-lg">
        {/* SEARCH A PRODUCT */}
        <div className="container mx-auto relative px-5 md:px-0 mt-4 py-8">
          <h1 className="text-2xl font-semibold mb-2">Search a Product</h1>
          <div className="flex items-center">
            <input
              onBlur={() => {
                setDropdown([]);
              }}
              onChange={onDropdownEdit}
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

          {/* LOADING SPINNER */}
          {loading && (
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 40 40"
                stroke="#000"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  strokeWidth="4"
                  strokeDasharray="90 60"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          )}

          {/* DROP DOWN CONTAINER */}
          <div className="dropContainer absolute bg-blue-100 mt-1 container mx-auto w-[80vw] sm:w-full rounded-md">
            {dropdown.map((item, i) => {
              return (
                <div
                  className="flex justify-between  my-2 px-10 gap-5 border-b "
                  key={i}
                >
                  <span className=""> {item.slug}</span>
                  <span className="">{item.price}</span>
                  <span className="">{item.quantity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ADD A NEW PRODUCT */}
        <h1 className="font-semibold text-2xl">Add a Product</h1>

        <form className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Slug
            </label>
            <input
              value={productForm?.slug || ""}
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
              value={productForm?.quantity || ""}
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
              value={productForm?.price || ""}
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

        {/* CURRENT STOCK */}
        <h1 className="text-2xl font-semibold pt-8 ">Current Stock</h1>
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
            {products.map((product, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{product.slug}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePAge;
