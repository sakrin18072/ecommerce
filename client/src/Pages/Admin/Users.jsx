import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminPanel from "./AdminPanel";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/users");
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Layout>
      <div className=" mx-auto bg-gradient-to-b from-blue-800 to-blue-200">
        <div className="flex min-h-screen p-3">
          <div className="w-1/4 px-4 py-6">
            <AdminPanel />
          </div>
          <div className="w-3/4 px-4 py-6">
            <div className="bg-white rounded-xl p-5">
              <h1 className="text-center text-2xl font-bold mb-6">All users</h1>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th className="py-2">#</th>
                      <th className="py-2">Name</th>
                      <th className="py-2">E-mail</th>
                      <th className="py-2">Phone</th>
                      <th className="py-2">CreatedAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{user.name}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2">{user.phone}</td>
                        <td className="py-2">{moment(user?.createdAt).format()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
