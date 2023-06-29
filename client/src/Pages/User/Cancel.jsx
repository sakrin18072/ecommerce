import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useCart } from '../../Contexts/CartContext';

const Cancel = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart();


  const createOrder = async () => {
      try {
          const auth = localStorage.getItem("auth");
          const cart = JSON.parse(localStorage.getItem('cart'))
          const parseData = JSON.parse(auth);
          const token = parseData.token;
          const { data } = await axios.post("/api/v1/product/create-order", {
              cart,payment:"failed"
          },{headers:{Authorization: token}});
          if (data?.success) {
              setCart([]);
              localStorage.removeItem("cart");

              navigate(
                  `/dashboard/${
                      parseData?.user?.role === 1
                          ? "admin/admin-orders"
                          : "user/order-history"
                  }`
              );
          }
      } catch (err) {
          console.log(err);
      }
  };

  useEffect(() => {
      createOrder();
  }, []);
  return (
    <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Payment Cancelled</h2>
        <p className="text-gray-600 mb-4">We're sorry, but your payment has been cancelled.</p>
        <p className="text-gray-600 mb-4">If you have any questions, please contact our support team.</p>
        <button onClick={(e)=>{e.preventDefault();navigate('/contact')}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Contact Support
        </button>
      </div>
    </div>
    </Layout>
  )
}

export default Cancel