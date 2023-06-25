import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthorizationContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [auth, setAuth] = useAuth();

  const formSubmit = async (data) => {
    try {
      console.log(process.env.SERVER_URL);
      const result = await axios.post(`/api/v1/auth/forgot-password`, data);
      if (result.data.success === true) {
        toast.success("Password reset successful");
        navigate("/login");
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
          <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold">Email address</label>
              <input type="email" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('email', { required: true })} />
              {errors.email && <p className="text-red-500">* This field is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="answer" className="block text-lg font-semibold">Security question's answer</label>
              <input type="text" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('answer', { required: true })} />
              {errors.answer && <p className="text-red-500">* This field is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-lg font-semibold">New Password</label>
              <input type="password" className="form-input mt-1 w-full py-2 border border-blue-400" {...register('newPassword', { required: true, minLength: 8 })} />
              {errors?.newPassword?.type === 'required' && <p className="text-red-500">* This field is required</p>}
              {errors?.newPassword?.type === 'minLength' && <p className="text-red-500">* Password must be at least 8 characters long</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Recover Account</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
