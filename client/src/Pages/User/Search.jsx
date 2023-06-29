import React from "react";
import { useSearch } from "../../Contexts/SearchContext";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import toast from 'react-hot-toast'
const Search = () => {
  const [search, setSearch] = useSearch();
  const [cart,setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="flex justify-center gap-x-4 gap-y-4">
        <div className="flex justify-center mx-72">
          {search?.result?.map((p) => {
            return (
              <Link
                                        to={`/product/${p.slug}`}
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
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
