import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        console.log(product);
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
        console.log(data);
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
      <div className="row container mt-4 mx-auto">
        <div className="col-10 col-lg-3 mx-auto">
          <img
            src={`/api/v1/product/get-photo/${product?._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ height: "22rem", objectFit: "contain" }}
          />
        </div>
        <div className="col-10 col-lg-7 mx-auto">
          <h1>{product?.name}</h1>
          <h6 className="mt-3">{product?.description}</h6>
          <p className="mt-3">
            {"Price: \u20B9"} {product?.price}
          </p>
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setCart([...cart, product]);
              toast.success("Item added to cart");
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            Add to cart
          </button>
        </div>
        <hr className="mt-3" />
      </div>
      <div className="row mx-auto">
        <h3 className="text-center">
          {relatedProducts.length > 0 ? (
            <h3 className="text-warning" style={{ display: "inline" }}>
              <h3 style={{ display: "inline" }} className="text-dark">
                Similar
              </h3>{" "}
              Products
            </h3>
          ) : (
            <h3 className="text-warning" style={{ display: "inline" }}>
              No simlar products found :(
            </h3>
          )}
        </h3>
        <div className="d-flex flex-wrap ">
          {relatedProducts?.map((p) => {
            return (
              <div className="card m-1 p-2 mx-auto" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/get-photo/${p?._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "22rem", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p?.name.substring(0, 30)}</h5>
                  <p className="card-text">
                    {p?.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">
                    {"\u20B9 "}
                    {p?.price}
                  </p>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                      window.location.reload();
                    }}
                  >
                    More details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      toast.success("Item added to cart");
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
