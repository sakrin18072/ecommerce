import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'
export const registerController =async (request,response)=>{
    try{
        const {name,email,password,phone,address,answer} = request.body;
        if(!name) return request.send({success:false,message:"Name is required"})
        if(!email) return request.send({success:false,message:"E-mail is required"})
        if(!password) return request.send({success:false,message:"Password is required"})
        if(!phone) return request.send({success:false,message:"Phone is required"})
        if(!address) return request.send({success:false,message:"Address is required"})
        if(!answer) return request.send({success:false,message:"Answer is required"})

        // Check user
        const existingUser = await userModel.findOne({email})
        //Existing user
        if(existingUser){
            return response.status(200).send({
                success:false,
                message:"User already registered, please login"
            })
        }

        // Register user
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()
        response.status(201).send({
            success:true,
            message:'User registered successfully',
            user
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message:"Error in registration",
            error
        })
    }
}

export const loginController = async (request,response)=>{
    try{
        const {email,password} = request.body;
        if(!email || !password){
            response.status(200).send({
                success:false,
                message:"Invalid E-mail or password"
            })
        }
        const user = await userModel.findOne({email})
        if(!user) return response.status(200).send({
            success:false,
            message:'User is not registered'
        })
        const match =await comparePassword(password,user.password)

        if(!match){
            return response.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }

        const token = await JWT.sign({_id:user.id},process.env.JWT_KEY,{expiresIn:'7d'})
        response
        response.status(200).send({
            success:true,
            message:'Login successful',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            success:false,
            message: "Error in login",
            error
        })
    }
}
export const forgotPasswordController = async (request,response)=>{
    const {email,answer,newPassword} = request.body
    let user = await userModel.findOne({email})
    if(user===null){
        return response.status(200).send({
            success:false,
            message:"User not found"
        })
    }
    if(user.answer === answer){
        const hashedPassword = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashedPassword});
        return response.status(200).send({
            success:true,
            message:"Password changed successfully"
        })
    }
    else{
        return response.status(200).send({
            success:false,
            message:"Given details are invalid, try again"
        }) 
    }
}