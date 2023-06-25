import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserPanel from "./UserPanel";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../Contexts/AuthorizationContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const user = auth?.user;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    try {
      const result = await axios.put(`/api/v1/auth/update-user`, data);
      if (result?.data?.success === true) {
        setAuth({ ...auth, user: result.data.updatedUser });
        const localUser = JSON.parse(localStorage.getItem("auth"));
        localUser.user = result.data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(localUser));
        toast.success("User updated successfully");
      } else {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating user profile");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4 p-4">
            <UserPanel />
          </div>
          <div className="w-3/4 p-4 bg-white rounded shadow mt-3">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="py-2 border border-blue-400 form-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  {...register("name", { required: true })}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500">* This field is required</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="py-2 border border-blue-400 form-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  {...register("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500">* This field is required</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="py-2 border border-blue-400 form-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">* This field is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">* Password must be at least 8 characters long</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  className="py-2 border border-blue-400 form-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  {...register("phone", { required: true })}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-red-500">* This field is required</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="py-2 border border-blue-400 form-input mt-1 block w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  {...register("address", { required: true })}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <p className="text-red-500">* This field is required</p>}
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
