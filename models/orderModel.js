import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    products:[
        {
            type:mongoose.ObjectId,
            ref:'productModel'
        }
    ],
    payment:{
        type:String,
        required:true
    },
    buyer:{
        type:mongoose.ObjectId,
        ref:'users'
    },
    status:{
        type:String,
        default:"Not processed",
        enum:["Not processed","Processing","Shipped","Delivered","Canceled"]
    }
},{timeStamps:true})

export default mongoose.model('orderModel',orderSchema)