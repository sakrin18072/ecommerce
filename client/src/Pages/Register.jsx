import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const formSubmit = async (data) => {
    try {
      const result = await axios.post(`/api/v1/auth/register`, data);
      if (result.data.success === true) {
        navigate("/login");
        toast.success("Registered successfully");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 to-blue-200">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
          <form onSubmit={handleSubmit(formSubmit)}>

            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold">Name</label>
              <input type="text" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('name', { required: true })} />
              {errors.name && <p className="text-red-500">* This field is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold">Email address</label>
              <input type="email" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('email', { required: true })} />
              {errors.email && <p className="text-red-500">* This field is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-semibold">Password</label>
              <input type="password" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('password', { required: true, minLength: 8 })} />
              {errors?.password?.type === 'required' && <p className="text-red-500">* This field is required</p>}
              {errors?.password?.type === 'minLength' && <p className="text-red-500">* Password must be at least 8 characters long</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-semibold">Phone</label>
              <input type="text" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('phone', { required: true })} />
              {errors.phone && <p className="text-red-500">* This field is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-lg font-semibold">Address</label>
              <input type="text" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('address', { required: true })} />
            </div>

            <div className="mb-4">
              <label htmlFor="answer" className="block text-lg font-semibold">What's your favourite sport (security question)</label>
              <input type="text" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('answer', { required: true })} />
              {errors.answer && <p className="text-red-500">* This field is required</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Let me in!</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
