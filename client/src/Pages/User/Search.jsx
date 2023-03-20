import React from "react";
import { useSearch } from "../../Contexts/SearchContext";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import toast from 'react-hot-toast'
const Search = () => {
  const [search, setSearch] = useSearch();
  const [cart,setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="text-center m-3">
          {search.result.length < 1 ? (
            <h1>No Products found :(</h1>
          ) : (
            <h1>{`${search.result.length} items found`}</h1>
          )}
        </div>

        <div className="d-flex flex-wrap ">
          {search?.result?.map((p) => {
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
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
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

export default Search;
