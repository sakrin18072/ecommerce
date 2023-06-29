import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthorizationContext";
import moment from "moment";
import AdminPanel from "./AdminPanel";
import { Select } from "antd";

const { Option } = Select;

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

  const handleChange = async (orderId, value) => {
    const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
      status: value,
    });
    fetchOrders();
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 px-4 py-6">
            <AdminPanel />
          </div>
          <div className="w-full md:w-3/4 px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">All orders</h1>
            <div className="border shadow overflow-x-auto">
              {orders?.map((o, i) => (
                <div key={i}>
                  <table className="table w-full">
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
                        <td>
                          <Select
                            bordered={false}
                            onChange={(val) => handleChange(o._id, val)}
                            defaultValue={o?.status}
                          >
                            {status.map((val, i) => (
                              <Option key={i} value={val}>
                                {val}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).toLocaleString().substring(3,16)}</td>
                        <td>{o?.payment}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="grid grid-cols-1 gap-4">
                    {o?.products?.map((p, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg shadow-md p-4 md:p-6"
                      >
                        <div className="flex">
                          <div className="w-1/4">
                            <img
                              src={`/api/v1/product/get-photo/${p._id}`}
                              className="w-full h-auto rounded-lg"
                              alt="ProductImage"
                            />
                          </div>
                          <div className="w-3/4 pl-4">
                            <h5 className="text-xl font-semibold mb-2">
                              {p.name}
                            </h5>
                            <p className="text-sm mb-4">{p.description}</p>
                            <p className="text-lg font-semibold">
                              ₹ {p.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="my-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
