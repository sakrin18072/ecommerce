import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import { Modal } from "react-bootstrap";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName,setUpdatedName] = useState('')
  const [show,setShow] = useState(false);
  const handleClose = ()=>setShow(false)
  const handleOpen = ()=>setShow(true)
  const [slug,setSlug] = useState('')
  const fetchCategories = async () => {
    try {
      const resp = await axios.get(
        "/api/v1/category/categories"
      );
      if (resp?.data?.success) {
        setCategories(resp?.data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleUpdate = async (e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.put(`/api/v1/category/update-category/${slug}`,{name:updatedName})
      if(data?.success){
        toast.success(`Category ${name} updated successfully`)
        fetchCategories();
        setUpdatedName("");
        handleClose();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      console.log(error)
      toast.error("Something went wrong while editing category")
    }
  }
  const handleDelete =async (slugToDelete)=>{
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${slugToDelete}`)
      if(data?.success){
        toast.success(`${slugToDelete} deleted successfully`)
        fetchCategories();
      }
    } catch (error) {
      toast.error(`Failed to delete ${slugToDelete} category`)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        fetchCategories();
        toast.success(`${name} category is created`);
        setName('')
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while adding category");
    }
  };
  
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 col-md-2 m-3">
            <AdminPanel />
          </div>
          <div className="col-10 col-md-8 w-50 mx-auto m-3">
            <CategoryForm
              name={name}
              setName={setName}
              handleSubmit={handleSubmit}
            />
            <table className="table mt-3">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category?.name}</td>
                    <td>
                      <button className="btn btn-dark ms-1" onClick={()=>{handleOpen();setUpdatedName(category.name);setSlug(category.slug)}}>Edit</button>
                      <button className="btn btn-danger ms-1" onClick={()=>{handleDelete(category.slug);}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CategoryForm name={updatedName} setName={setUpdatedName} handleSubmit={handleUpdate}/>
                  </Modal.Body>
            </Modal>
          </div>
          
        </div>
      </div>
      
    </Layout>
  );
};

export default CreateCategory;
