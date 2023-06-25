import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminPanel from "./AdminPanel";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/products");

      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something broke :(");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 px-4 py-6">
            <AdminPanel />
          </div>
          <div className="w-full md:w-3/4 px-4 py-6">
  <h1 className="text-2xl font-bold text-center mb-4">Products</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products?.map((p) => (
      <Link
        key={p?._id}
        to={`/dashboard/admin/update-product/${p?.slug}`}
        className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      >
        <img
          src={`/api/v1/product/get-photo/${p._id}`}
          alt={p.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h5 className="text-lg font-semibold mb-2">{p?.name.substring(0, 30)}</h5>
          <p className="text-sm text-gray-500 mb-2">{p?.description.substring(0, 30)}...</p>
          <p className="text-lg font-semibold">₹ {p?.price}</p>
        </div>
      </Link>
    ))}
  </div>
</div>

        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
