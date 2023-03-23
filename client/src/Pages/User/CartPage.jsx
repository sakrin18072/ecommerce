import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from 'braintree-web-drop-in-react'
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken,setClientToken] = useState("");
  const [instance,setInstance] = useState("")
  const navigate = useNavigate();

  const getToken = async()=>{
    try {
      const {data} =await axios.get('/api/v1/product/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getToken();
  },[auth?.token])
  const handleRemove = (pid) => {
    try {
      const Cart = [...cart];
      const ind = Cart.findIndex((item) => item._id === pid);
      Cart.splice(ind, 1);
      setCart(Cart);
      localStorage.setItem("cart", JSON.stringify(Cart));
    } catch (error) {
      console.log(error);
    }
  };
  const totalCalc = () => {
    try {
      let total = 0;
      cart?.map((item) => (total += item.price));
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (request,response)=>{
    try {
      const {nonce} = await instance.requestPaymentMethod();
      const {data} = await axios.post('/api/v1/product/braintree/payment', {nonce,cart});
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/order-history')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <h4 className="text-center mt-3">
          {cart?.length > 0
            ? auth?.token
              ? `Your cart has ${cart.length} items`
              : "Please login to checkout"
            : "Your Cart is empty"}
        </h4>
        <div className="row mx-auto">
          <div className="col-10 col-md-6">
            {cart?.map((p) => (
              <div className="card mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/get-photo/${p._id}`}
                      className="img-fluid rounded-start"
                      alt="ProductImage"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">
                        <p>
                          {"\u20B9 "}
                          {p.price}
                        </p>
                      </p>
                      <p className="card-text">
                        <small>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleRemove(p._id);
                            }}
                          >
                            Remove from cart
                          </button>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-10 col-md-4 mx-auto">
            <h4>Cart Summary</h4>
            <hr />
            <div>
              <span>Total Payable: </span> {"\u20B9"}
              {totalCalc()}
            </div>
            <div className="col-10 col-md-4 mt-3">
              {!auth?.user && (
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Login to checkout
                </button>
              )}
            </div>
            {!clientToken || !cart.length ? (""):
            <>
            <div className="mt-3">
              <DropIn
              options={{
                authorization:clientToken,
                paypal:{
                  flow:'vault'
                }
              }}
              onInstance={(instance)=>setInstance(instance)}
              />
              {auth?.user && <button className="btn btn-dark mx-auto w-100 m-3" onClick={handlePayment}>Make Payment</button>}
            </div>
            </>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
