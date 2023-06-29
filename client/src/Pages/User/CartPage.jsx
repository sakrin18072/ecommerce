import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const handleRemove = (pid) => {
        try {
            const updatedCart = cart.filter((item) => item._id !== pid);
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.log(error);
        }
    };

    const totalCalc = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price;
            });
            return total;
        } catch (error) {
            console.log(error);
        }
    };

    const handlePayment = async ()=>{
      try {
        const {data} = await axios.post('/api/v1/product/payment',{items:cart});
        if(data?.success){
          window.location.href = data.url;
        }
        else{
          console.log("Error in payment");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <Layout>
            <div className="container mx-auto">
                <h4 className="text-center mt-3">
                    {cart?.length > 0
                        ? auth?.user
                            ? `Your cart has ${cart.length} items`
                            : "Please login to checkout"
                        : "Your Cart is empty"}
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        {cart?.map((p) => (
                            <div
                                key={p._id}
                                className="border rounded-md border-gray-300 p-4"
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={`/api/v1/product/get-photo/${p._id}`}
                                        className="w-1/3 rounded-md"
                                        alt="ProductImage"
                                    />
                                    <div>
                                        <h5 className="font-bold">{p.name}</h5>
                                        <p className="text-gray-600 mb-2">
                                            {p.description}
                                        </p>
                                        <p className="text-lg font-bold text-blue-500">
                                            {"\u20B9"} {p.price}
                                        </p>
                                        <button
                                            className="btn btn-danger mt-2"
                                            onClick={() => handleRemove(p._id)}
                                        >
                                            Remove from cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4 className="text-center">Cart Summary</h4>
                        <hr className="my-4" />
                        <div className="text-center">
                            <span className="font-bold">Total Payable: </span>
                            {"\u20B9"} {totalCalc()}
                        </div>
                        <div className="mt-3">
                            {!auth?.user && (
                                <button
                                    className="btn btn-dark mx-auto w-full"
                                    onClick={() =>
                                        navigate("/login", {
                                            state: "/cart",
                                        })
                                    }
                                >
                                    Login to checkout
                                </button>
                            )}
                            {cart.length > 0 && auth?.user && (
                                <div className="w-full">
                                    <button onClick={handlePayment} className="px-3 py-2 bg-blue-600 text-white rounded-lg m-auto">Pay Now</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
