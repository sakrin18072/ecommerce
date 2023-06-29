import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../../Contexts/CartContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        setProduct(data.product[0]);
        getSimilarProducts(data.product[0]._id, data.product[0].category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${pid}/${cid}`);

      if (data?.success) {
        setRelatedProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto mt-4 mb-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mx-auto">
            <img
              src={`/api/v1/product/get-photo/${product?._id}`}
              className="card-img-top"
              alt={product.name}
              style={{ height: "22rem", objectFit: "contain" }}
            />
          </div>
          <div className="mx-auto">
            <h1 className="text-xl font-bold mb-2">{product?.name}</h1>
            <p className="text-gray-600 mb-4">{product?.description}</p>
            <p className="text-xl text-blue-500 mb-4">
              Price: ₹{product?.price}
            </p>
            <button
              className="btn btn-blue w-full mt-4 bg-blue-700 text-white hover:bg-blue-500"
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Item added to cart");
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <hr className="mt-6" />
        <h3 className="text-center text-xl font-bold mt-8 mb-4">
          {relatedProducts.length > 0 ? (
            <span className="text-blue-500">Similar Products</span>
          ) : (
            <span className="text-blue-500">No similar products found :(</span>
          )}
        </h3>
        <div className="flex ">
          {relatedProducts?.map((p) => (
            <Link
            onClick={(e)=>{e.preventDefault();navigate(`/product/${p.slug}`);window.location.reload();}}
            key={p._id}
            className="border rounded-md border-gray-300 shadow-md m-2 p-3 w-52 hover:scale-110 transition"
        >
            <img
                src={`/api/v1/product/get-photo/${p._id}`}
                className="w-full h-48 object-contain mb-4"
                alt={p.name}
            />
            <div className="">
                <h5 className="text-xl font-extrabold mb-2">
                    {p?.name.substring(0, 30)}
                </h5>
                <p className="text-base mb-2">
                    {p?.description.substring(
                        0,
                        30
                    )}
                    ...
                </p>
                <p className="mb-2 font-extrabold">
                    ₹ {p?.price}
                </p>
            </div>
        </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
