import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthorizationContext";
import moment from "moment";
import AdminPanel from "./AdminPanel";
import {Select} from 'antd'
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useAuth();
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
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
  const handleChange = async (orderId,value) => {
    const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`,{status:value})
    fetchOrders();
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-2 m-3">
            <AdminPanel />
          </div>
          <div className="col-8 m-3 class-2">
            <h1>All orders</h1>
            <div className="container w-100 mx-auto">
              <div className="border shadow w-100">
                {orders?.map((o, i) => {
                  return (
                    <>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>
                                <Select bordered={false} onChange={(val)=>handleChange(o._id,val)} defaultValue={o?.status}>
                                    {
                                        status.map((val, i)=>{
                                            return <Select.Option key={i} value={val}>{val}</Select.Option>
                                        })
                                    }
                                </Select>
                            </td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>
                              {o?.payment?.success ? "Success" : "Failed"}
                            </td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mx-auto">
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
                        <hr />
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

export default AdminOrders;
