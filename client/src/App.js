import Layout from "./components/Layout/Layout";
import { Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home";
import Policy from "./Pages/Policy";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserDashboard from "./Pages/User/UserDashboard";
import PrivateRoute from "./components/Private Routes/PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminRoute from "./Pages/Admin/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import OrderHistory from "./Pages/User/OrderHistory";
import EditProfile from "./Pages/User/EditProfile";
import ChangePassword from "./Pages/User/ChangePassword";
import ProductsPage from "./Pages/Admin/ProductsPage";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/order-history" element={<OrderHistory />} />
          <Route path="user/edit-profile" element={<EditProfile />} />
          <Route path="user/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />          
          <Route path="admin/products" element={<ProductsPage />} />          
          <Route path="admin/create-category" element={<CreateCategory />} />          
          <Route path="admin/create-product" element={<CreateProduct />} />          
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />          
          <Route path="admin/users" element={<Users />} />   
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
