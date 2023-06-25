import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { priceFilter } from '../components/priceFilters';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import toast from 'react-hot-toast';
import Layout from '../components/Layout/Layout';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      if (data?.success) {
        setCount(data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/filter-product', {
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
      if (all.length === 0) {
        window.location.reload();
      }
    }
    setChecked(all);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      if (data?.success) {
        setProducts((prevProducts) => [...prevProducts, ...data?.products]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      fetchProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length !== 0 || radio.length !== 0) {
      fetchFilteredProducts();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get('/api/v1/category/categories');
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
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
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
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 md:w-1/4 mt-3 px-2">
            <h4 className="text-base font-semibold">Category filters</h4>
            <div className="flex flex-col mt-2">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <Checkbox
                    className="text-sm text-gray-700"
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </div>
            <h4 className="mt-4 text-base font-semibold">Price filters</h4>
            <div className="mt-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {priceFilter.map((p) => (
                  <div key={p._id} className="mb-2">
                    <Radio className="text-sm text-gray-700" value={p.price}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="mt-4">
              <button
                className="btn btn-dark"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-3/4 mt-3 px-2">
  <h1 className="text-2xl font-bold">Products</h1>
  <div className="flex flex-wrap mt-4">
    {products?.map((p) => {
      return (
        <div
          key={p._id}
          className="border rounded-md border-gray-300 shadow-md m-2 p-3 w-72"
        >
          <img
            src={`/api/v1/product/get-photo/${p._id}`}
            className="w-full h-48 object-contain mb-4"
            alt={p.name}
          />
          <div className="">
            <h5 className="text-xl font-extrabold mb-2">{p?.name.substring(0, 30)}</h5>
            <p className="text-base mb-2">{p?.description.substring(0, 30)}...</p>
            <p className="mb-2">₹ {p?.price}</p>
            <div className="flex justify-between">
              <button
                className="btn text-white bg-blue-400 hover:bg-blue-800"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                More details
              </button>
              <button
                className="btn bg-blue-700 text-white ml-2 hover:bg-blue-800"
                onClick={() => {
                  setCart([...cart, p]);
                  toast.success('Item added to cart');
                  localStorage.setItem('cart', JSON.stringify([...cart, p]));
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
  <div className="mt-4">
    {products && products?.length < count && (
      <button
        className="btn bg-blue-500 text-white hover:bg-blue-800"
        onClick={() => setPage(page + 1)}
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
