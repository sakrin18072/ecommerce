import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthorizationContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [auth, setAuth] = useAuth();

  const formSubmit = async (data) => {
    try {
      const result = await axios.post(`/api/v1/auth/login`, data);
      if (result.data.success === true) {
        toast.success("Login successful");
        setAuth({
          ...auth,
          user: result.data.user,
          token: result.data.token
        });
        localStorage.setItem('auth', JSON.stringify(result.data));
        navigate(location.state || "/");
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
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-semibold">Email address</label>
              <input type="email" className="form-input mt-1 p-3 border border-blue-400 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm" {...register('email', { required: true })} />
              {errors.email && <p className="text-red-500">* This field is required</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-semibold">Password</label>
              <input type="password" className="form-input mt-1 p-3 border border-blue-400 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm" {...register('password', { required: true, minLength: 8 })} />
              {errors?.password?.type === 'required' && <p className="text-red-500">* This field is required</p>}
              {errors?.password?.type === 'minLength' && <p className="text-red-500">* Password must be at least 8 characters long</p>}
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => navigate('/forgot-password')} className="text-blue-500 hover:text-blue-700">Forgot Password</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
