import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminPanel from "./AdminPanel";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const fetchCategories = async () => {
    try {
      const resp = await axios.get("/api/v1/category/categories");
      if (resp?.data?.success) {
        setCategories(resp?.data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const dat = new FormData();
      dat.append("name", name);
      dat.append("description", description);
      dat.append("price", price);
      dat.append("category", category);
      dat.append("quantity", quantity);
      dat.append("photo", photo);
      dat.append("shipping", shipping);
      const { infor } = await axios.post("/api/v1/product/create-product", dat);
      toast.success(infor?.message);
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong product creation failed :(");
    }
  };
  return (
    <Layout>
      <div className="container-fluid bg-gradient-to-b from-blue-800 to-blue-200">
        <div className="row">
          <div className="col-10 col-md-2 m-3">
            <AdminPanel />
          </div>
          <div className="col-10 mx-auto col-md-8 w-50 text-base bg-white p-5 rounded-3xl m-3">
            <h1 className="m-3 text-2xl text-center font-bold">Create Product</h1>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="small"
              showSearch
              showArrow={false}
              className="form-select mb-3"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((cat) => (
                <Option key={cat.name} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn bg-blue-500 text-white hover:bg-blue-800 col-md-12">
                {photo ? photo.name : "upload photo"}
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3 text-center">
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="productphoto"
                  height="200px"
                  className="img img-responsive"
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name of the Product
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description of the Product
              </label>
              <textarea
                type="text-area"
                name="description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price of the Product
              </label>
              <input
                type="text"
                name="price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity of the Product
              </label>
              <input
                type="text"
                name="quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <Select
              bordered={false}
              placeholder="Shipping"
              size="small"
              showSearch
              showArrow={false}
              className="form-select mb-3"
              onChange={(value) => setShipping(value)}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
            <button className="btn bg-blue-700 hover:bg-blue-800 text-white mb-3" onClick={handleUpdate}>
              Create Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
