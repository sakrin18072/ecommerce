import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminPanel from "./AdminPanel";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selected, setSelected] = useState(false);
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
  const params = useParams();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const dat = new FormData();
      dat.append("name", name);
      dat.append("description", description);
      dat.append("price", price);
      if (selected) {
        dat.append("category", category);
      } else {
        dat.append("category",selectedCategoryId)
      }
      dat.append("quantity", quantity);
      photo && dat.append("photo", photo);
      dat.append("shipping", shipping);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        dat
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong product creation failed :(");
    }
  };
  const fetchCurrentProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        console.log(data);
        setName(data.product[0].name);
        setDescription(data.product[0].description);
        setPrice(data.product[0].price);
        setCategory(data.product[0].category.name);
        setQuantity(data.product[0].quantity);
        setShipping(data.product[0].shipping);
        setId(data.product[0]._id);
        setSelectedCategoryId(data.product[0].category._id);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something broke :(");
    }
  };
  useEffect(() => {
    fetchCurrentProduct();
  }, []);

  const handleDelete =async ()=>{
    try {
        let ans = window.prompt("Do you want to delete the product ? (Y/N)")
        if(!ans) return;
        const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
        if(data?.success){
            toast.success(data.message)
            navigate('/dashboard/admin/products');
        }
        else{
            toast.error(data.message);
        }
    } catch (error) {
        toast("Something went wrong :(");
        console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 col-md-2 m-3">
            <AdminPanel />
          </div>
          <div className="col-10 mx-auto col-md-8 w-50">
            <h1 className="m-3">Update Product</h1>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="small"
              showSearch
              showArrow={false}
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value); setSelected(true);
              }}
              value={category}
            >
              {categories?.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-dark col-md-12">
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
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="productphoto"
                  height="200px"
                  className="img img-responsive"
                />
              ) : (
                <img
                  src={`/api/v1/product/get-photo/${id}`}
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
                value={name}
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
                value={description}
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
                value={price}
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
                value={quantity}
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
              value={shipping ? "Yes" : "No"}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
            <button className="btn btn-dark m-3" onClick={handleUpdate}>
              Update Product
            </button>
            <button className="btn btn-danger m-3" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
