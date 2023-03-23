import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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
      .select("-photo")
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
      .populate("category");
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
    const product = await productModel
      .findById(request.params.pid)
      .select("photo");
    if (product?.photo?.data) {
      response.set("Content-type", product.photo.contentType);
      return response.status(200).send(product.photo.data);
    }
    return response.status(200).send({
      success: false,
      message: "No photo data found",
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

export const deleteProductController = async (request, response) => {
  try {
    await productModel.findByIdAndDelete(request.params.pid);
    return response.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "error in deleting product",
      error,
    });
  }
};

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

    const product = await productModel.findByIdAndUpdate(
      request.params.pid,
      { ...request.fields, slug: slugify(name) },
      { new: true }
    );

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

export const filterProductController = async (request, response) => {
  try {
    const { checked, radio } = request.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(args);
    return response.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error in filtering products",
      error,
    });
  }
};

export const productCountController = async (request, response) => {
  try {
    const count = await productModel.find({}).estimatedDocumentCount();
    response.status(200).send({
      success: true,
      count,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error in fetching product count",
      error,
    });
  }
};

export const productPageController = async (request, response) => {
  try {
    const page = request.params.page ? request.params.page : 1;
    const itemsPerPage = 6;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });
    response.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error in product page controller",
      error,
    });
  }
};

export const searchProductController = async (request, response) => {
  try {
    const { key } = request.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: key, $options: "i" } },
          { description: { $regex: key, $options: "i" } },
        ],
      })
      .select("-photo");
    return response.status(201).send({
      success: true,
      products: result,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error in searchProductController",
      error,
    });
  }
};

export const similarProductsController = async (request, response) => {
  try {
    const { pid, cid } = request.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(9)
      .populate("category");
    return response.status(201).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error in similar Products Controller",
      error,
    });
  }
};

export const brainTreeTokenController = async (request, response) => {
  try {
    gateway.clientToken.generate({}, (error, result) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(result);
      }
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error in braintree token controller",
      error,
    });
  }
};
export const brainTreePaymentController = async (request, response) => {
  try {
    const { cart, nonce } = request.body;
    let total = 0;
    cart.map((i) => (total += i.price));
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (error, result) => {
        if (result) {
          const order = new orderModel({
            products: [...cart],
            payment: result,
            buyer: request.user._id,
          }).save();
          response.send({ ok: true });
        } else {
          response.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: "Error in braintree payment controller",
      error,
    });
  }
};
