import { response } from "express";
import fs from "fs";
import { request } from "http";
import slugify from "slugify";
import productModel from "../models/productModel.js";

export const createProductController = async (request, response) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;
    if (!name)
      return response
        .status(500)
        .send({ success: false, message: "Name is required" });
    if (!description)
      return response
        .status(500)
        .send({ success: false, message: "Description is required" });
    if (!price)
      return response
        .status(500)
        .send({ success: false, message: "Price is required" });
    if (!category)
      return response
        .status(500)
        .send({ success: false, message: "Category is required" });
    if (!quantity)
      return response
        .status(500)
        .send({ success: false, message: "Quantity is required" });
    if (photo && photo.size > 1000000)
      return response.status(500).send({
        success: false,
        message: "Photo is required and its size must be less than 1MB",
      });

    const product = await new productModel({
      ...request.fields,
      slug: slugify(name),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return response.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error in creating product",
      error,
    });
  }
};

export const productController = async (request, response) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select('-photo')
      .limit(10)
      .sort({ createdAt: -1 });
    return response.status(200).send({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error in getting products",
      error,
    });
  }
};

export const singleProductController = async (request, response) => {
  try {
    const product = await productModel
      .find({ slug: request.params.slug })
      .populate("category")
    if (!product) {
      return response.status(500).send({
        success: false,
        message: "Unable to fetch product currently",
      });
    }
    return response.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error in getting single product",
      error,
    });
  }
};

export const getPhotoController = async (request, response) => {
  try {
    const product = await productModel.findById(request.params.pid).select('photo')
    if(product?.photo?.data){
      response.set('Content-type',product.photo.contentType);
      return response.status(200).send(product.photo.data)
    }
    return response.status(200).send({
      success:false,
      message:"No photo data found"
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error in getting single product",
      error,
    });
  }
};

export const deleteProductController = async(request,response)=>{
  try {
    await productModel.findByIdAndDelete(request.params.pid)
    return response.status(200).send({
      success:true,
      message:"Product deleted successfully"
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error in deleting product",
      error,
    });
  }
}

export const updateProductController = async (request, response) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;
    if (!name)
      return response
        .status(500)
        .send({ success: false, message: "Name is required" });
    if (!description)
      return response
        .status(500)
        .send({ success: false, message: "Description is required" });
    if (!price)
      return response
        .status(500)
        .send({ success: false, message: "Price is required" });
    if (!category)
      return response
        .status(500)
        .send({ success: false, message: "Category is required" });
    if (!quantity)
      return response
        .status(500)
        .send({ success: false, message: "Quantity is required" });
    if (photo && photo?.size > 1000000)
      return response.status(500).send({
        success: false,
        message: "Photo size must be less than 1MB",
      });

    const product = await productModel.findByIdAndUpdate(request.params.pid,{...request.fields,slug:slugify(name)},{new:true});

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return response.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error in updating product",
      error,
    });
  }
};
