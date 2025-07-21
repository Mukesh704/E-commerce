import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminApi";
import Loader from "../components/Loader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setProducts(data.response || []); // Adjusted for your actual API structure
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpen = (product = null) => {
    setEdit(product);
    setForm(product ? { name: product.name, price: product.price } : { name: "", price: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(null);
    setForm({ name: "", price: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.price < 0) return;
    try {
      if (edit) {
        await updateProduct(edit._id, form);
      } else {
        await createProduct(form);
      }
      handleClose();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => handleOpen()}
          className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left font-semibold">Image</th>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Brand</th>
              <th className="p-4 text-left font-semibold">Category</th>
              <th className="p-4 text-left font-semibold">Price</th>
              <th className="p-4 text-left font-semibold">Stock</th>
              <th className="p-4 text-left font-semibold">Rating</th>
              <th className="p-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    className="h-14 w-14 rounded object-cover"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">{p.name}</td>
                <td className="p-4">{p.brand}</td>
                <td className="p-4">{p.categories?.[0]?.name || "N/A"}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">{p.rating?.toFixed(1) || 0}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleOpen(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center p-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center backdrop-blur-sm"
          onClick={handleClose}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl p-6 w-96 space-y-4 animate-fade-in"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {edit ? "Edit Product" : "Add Product"}
            </h2>

            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-black"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-black"
              min="0"
              required
            />

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                {edit ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}