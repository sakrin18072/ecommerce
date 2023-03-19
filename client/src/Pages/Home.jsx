import Layout from "../components/Layout/Layout";
import { useAuth } from "../Contexts/AuthorizationContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { priceFilter } from "../components/priceFilters";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/products");

      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
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
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-11 col-md-2 mt-3">
            <h4>Category filters</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="mt-3">Price filters</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {priceFilter.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="col-11 col-md-9 mt-3">
            <h1>Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => {
                return (
                  <div className="card m-1 p-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/get-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p?.name}</h5>
                      <p className="card-text">{p?.description}</p>
                      <button className="btn btn-dark ms-1">
                        More details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
