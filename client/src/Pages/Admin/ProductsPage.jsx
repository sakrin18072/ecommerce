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
      <div className="row container-fluid ">
        <div className="col-10 col-md-2 m-3">
          <AdminPanel />
        </div>

        <div className="col-10 col-md-8 mx-auto">
          <h1 className="ml-auto">Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => {
              return (
              
              <Link
                className="text text-center"
                key={p?._id}
                to={`/dashboard/admin/update-product/${p?.slug}`}
              >
                <div className="card m-1" style={{ width: "18rem" }}>
                  
                  <img
                    src={`/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p?.name}</h5>
                    <p className="card-text">{p?.description}</p>
                  </div>
                </div>
              </Link>
            )})}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
