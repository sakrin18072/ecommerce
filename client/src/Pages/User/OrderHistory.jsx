import React, { useState } from "react";
import UserPanel from "./UserPanel";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthorizationContext";
import moment from "moment";
const OrderHistory = () => {
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useAuth();
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      if (data?.success) {
        setOrders(data.orders);
        console.log(data);
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 m-3">
            <UserPanel />
          </div>
          <div className="col-8">
            <h1 className="text-center m-3">All orders</h1>
            <div className="container">
              <div className="border shadow">
                {orders?.map((o, i) => {
                  return (
                    <>
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
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>
                              {o?.payment?.success ? "Success" : "Failed"}
                            </td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div>
                        {o?.products?.map((p, i) => {
                          return (
                            <div className="card m-3" style={{ maxWidth: 540 }}>
                              <div className="row g-0">
                                <div className="col-md-4">
                                  <img
                                    src={`/api/v1/product/get-photo/${p._id}`}
                                    className="img-fluid rounded-start"
                                    alt="ProductImage"
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text">
                                      <p>
                                        {"\u20B9 "}
                                        {p.price}
                                      </p>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
