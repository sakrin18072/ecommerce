import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthorizationContext";
import axios from "axios";
import { useCart } from "../../Contexts/CartContext";
const Success = () => {
    const navigate = useNavigate();
    const [cart,setCart] = useCart();

    const createOrder = async () => {
        try {
            const auth = localStorage.getItem("auth");
            const cart = JSON.parse(localStorage.getItem('cart'))
            const parseData = JSON.parse(auth);
            const token = parseData.token;
            const { data } = await axios.post("/api/v1/product/create-order", {
                cart,payment:"success"
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
                <div className="bg-white rounded-lg p-8 shadow-md">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">
                        Payment Successful
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Thank you for your payment!
                    </p>
                    <p className="text-gray-600 mb-4">
                        You will be redirected to your orders page shortly.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Success;
