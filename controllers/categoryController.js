import { request, response } from "express";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";

export const createCategoryController = async (request, response) => {
  try {
    const { name } = request.body;
    if (!name)
      return response.status(401).send({
        message: "Name is required",
      });
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return response.status(200).send({
        success: false,
        message: "Category already exists",
      });
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    response.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      sucess: false,
      message: "error in category",
    });
  }
};

export const updateCategoryController = async (request, response) => {
  try {
    const { name } = request.body;
    const { nameOfCategory } = request.params;
    const categoryInDB = await categoryModel.find({ slug: nameOfCategory });
    if (categoryInDB.length === 0) {
      return response.send({
        success: false,
        message: "Category not found",
      });
    }
    const idOfCategory = categoryInDB[0]._id;
    const category = await categoryModel.findByIdAndUpdate(
      idOfCategory,
      { name, slug: slugify(name) },
      { new: true }
    );
    response.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in update category controller",
      error,
    });
  }
};

export const categoryController = async (request, response) => {
  try {
    const categories = await categoryModel.find({});
    response.status(200).send({
      success: true,
      message: "All categories",
      categories,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in category controller",
      error,
    });
  }
};

export const singleCategoryController = async (request, response) => {
  try {
    const { slug } = request.params;
    const category = await categoryModel.find({ slug });
    if (category.length === 0) {
      return response.send({
        success: false,
        message: "Category not found",
      });
    }
    response.status(200).send({
      success: true,
      message: "Single category",
      category,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in single category controller",
      error,
    });
  }
};

export const deleteCategoryController = async (request, response) => {
  try {
    const { category } = request.params;
    const categoryIndb = await categoryModel.find({ slug: category });
    if (categoryIndb.length === 0) {
      return response.send({
        success: false,
        message: "Category not found",
      });
    }
    await categoryModel.findByIdAndDelete(categoryIndb[0]._id);
    response.status(200).send({
      success: true,
      message: "Category deleted successfully",
      name:categoryIndb[0].name
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in delete category controller",
      error,
    });
  }
};
