import React, { useState, useEffect } from "react";
import UserPanel from "./UserPanel";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthorizationContext";
import moment from "moment";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchOrders();
    }
  }, [auth]);

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 p-4">
            <UserPanel />
          </div>
          <div className="w-full md:w-3/4 p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">All Orders</h1>
            <div className="container">
              {orders?.map((o, i) => (
                <div key={i} className="border shadow mb-4">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Status</th>
                          <th>Buyer</th>
                          <th>Date</th>
                          <th>Payment</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    {o?.products?.map((p, i) => (
                      <div
                        key={i}
                        className="card md:flex-row md:mx-auto m-3 max-w-xs md:max-w-full"
                      >
                        <img
                          src={`/api/v1/product/get-photo/${p._id}`}
                          className="w-1/3 md:w-auto"
                          alt="ProductImage"
                        />
                        <div className="flex flex-col justify-between p-4">
                          <div>
                            <h5 className="font-bold mb-2">{p.name}</h5>
                            <p className="text-sm">{p.description}</p>
                          </div>
                          <p className="text-gray-700">
                            <span className="font-bold">Price:</span> &#8377;{" "}
                            {p.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
