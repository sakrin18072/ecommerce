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
  const [auth,setAuth] = useAuth();
  const user = auth?.user;
  const [name,setName] = useState(user.name);
  const [email,setEmail] = useState(user.email);
  const [phone,setPhone] = useState(user.phone);
  const [address,setAddress] = useState(user.address);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const formSubmit = async (dat) => {
    try {
      let {data} = await axios.put(`/api/v1/auth/update-user`, dat);
      if (data?.success === true) {
        console.log(data)
        
        setAuth({...auth,user:data?.updatedUser})
        const localUser = JSON.parse(localStorage.getItem('auth'))
        localUser.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(localUser))
        toast.success("User updated successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating user profile");
    }
  };
  
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 m-3">
            <UserPanel />
          </div>
          <div className="col-8">
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="d-flex flex-column row-cols-4 justify-content-center align-items-center"
              style={{
                fontSize: "medium",
                minHeight: "70vh",
              }}
            >
              <h1 className="text-center m-3">Edit Profile</h1>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: true })}
                  value = {name}
                  onChange = {(e)=>setName(e.target.value)}
                />
              </div>
              {errors.name && (
                <p className="text-danger">* This field is required</p>
              )}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                  value = {email}
                />
              </div>
              {errors.email && (
                <p className="text-danger">* This field is required</p>
              )}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password", { required: true, minLength: 8 })}
                />
              </div>
              {errors?.password?.type === "required" && (
                <p className="text-danger">* This field is required</p>
              )}
              {errors?.password?.type === "minLength" && (
                <p className="text-danger">
                  * Password must be atleast 8 characters long
                </p>
              )}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("phone", { required: true })}
                  value={phone}
                  onChange = {(e)=>setPhone(e.target.value)}
                />
              </div>
              {errors.phone && (
                <p className="text-danger">* This field is required</p>
              )}
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("address", { required: true })}
                  value = {address}
                  onChange = {(e)=>setAddress(e.target.value)}
                />
              </div>
              
              {errors.answer && (
                <p className="text-danger">* This field is required</p>
              )}
              <button type="submit" className="btn btn-- m-2">
                Let me in !
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
