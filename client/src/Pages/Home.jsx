import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { priceFilter } from "../components/priceFilters";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import toast from "react-hot-toast";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const getTotalCount = async (request, response) => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      if (data?.success) {
        setCount(data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-product", {
        checked,
        radio,
      });
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
      if(all.length === 0) {
        window.location.reload();
      }
    }
    setChecked(all);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);

      if (data?.success) {
        setProducts(...products, data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length && !radio.length) fetchProducts();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length !== 0 || radio.length !== 0) fetchFilteredProducts();
    // eslint-disable-next-line
  }, [checked, radio]);
  const fetchCategories = async () => {
    try {
      const resp = await axios.get("/api/v1/category/categories");
      if (resp?.data?.success) {
        setCategories(resp?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
    getTotalCount();
  }, []);

  const fetchPage = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    fetchPage();
  }, [page]);
  return (
    <Layout>
      <img
        src="https://lh3.googleusercontent.com/oy_bkQwRFi10diExjhtUYsRBjsPAj9bz6yDyN_OKxi1c_DP6vhsR6H597YQIOBqtBDjumALewclegPEO-3wpTdS9nG1Tnnljry2sW5sJk2yS5saKnxCSQ30iBvyEp9CbaxVPPFI-00hLLKI5IfUGaFMlIlXE1BCvBYvmfZ8euDcK51iBi1AZsOTRyvKYa1MM1fnHVvIfoWtGBDPciVF0CH2mePtOnvYUHJAwgLvrilaQ-y7SHMn9p2ARraRPtZrapCVOVJlVHQ2lC_bybY04J_qA7ulJtpbdHUeWCkxfXIUHhTpZyJhSxKSMfr0E0ftUeHRZCIDVIwl1JjsCKRBrntGAveAb3qaGZOljYxYj-kk6OeyII0S3cqtPktdOVN-_lylKKgtiGQ-MbE4G-LtKn-tYkZl7oeqLjFibujlDsvRPQ9d3T8il4E8g8iVLo2g0xPFW3qzYQkljGQE0925ZOO85G1jRA4ao1Jd19zi3p1L9Ahm_pj8vwO-kf2JLiHDufztuBNRhh7Q7XLzL0p0BxAWGYdZTAND9ha02utzrjNaoCJtBASQrYWN1fUFNRcIJnPtt5jetiHXJp53_80HbKVbB6PUwaPwMr8mEzwJARnX_cQ_wVN4TGUb1bSSnmXogGnBlD1iGed1v2d5FAfr2Fsb_f3GP7XueuKC3vJidx3skp4ZL2vkMZ1D7V3FuxK2HVvudsjnB7FZAOJvyzMimhxWeiekWKF_ULqODm6wNQViS78AQ1rGGIgqxdJt1qTjAYzixtnlKVfRcPzfvtDSvw1YPAtH3H8edM7HTQaQ8mJoaJTVvWnZnyQD1zvR-nXo0jnU3ibbvSczNMXfqXGzNRLx3WfNiXr72S3B9kxnERJ5_yMEmlqANEH5VzhbCcFqHwSaxJNKQq7bnyI993Wqi5ZEqrH9V01dkTmpccVezvkOyJIMat_AMV_RclNiP2u71clyPRyFZYjGEOudR3dPyGm4=w1920-h480-s-no?authuser=0"
        className="img-fluid"
        alt="ResponsiveImage"
        style={{ width: "100%", height: "auto" }}
      />

      <div className="container-fluid">
        <div className="row">
          

          <div className="col-11 col-md-2 mt-3">
            <h4>Category filters</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <div>
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </div>
            <h4 className="mt-3">Price filters</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {priceFilter.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.price}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div>
              <button
                className="btn btn-dark mt-3"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-11 col-md-9 mt-3">
            <h1>Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => {
                return (
                  <div
                    className="card m-1 p-2 mx-auto"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/get-photo/${p._id}`}
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
                        onClick={() => navigate(`/product/${p.slug}`)}
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
            <div>
              {products && products?.length < count && (
                <button
                  className="btn btn-dark m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  View more products
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
