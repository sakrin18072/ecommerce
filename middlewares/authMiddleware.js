import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import dotenv from 'dotenv';
//protected routes token based
export const requireSignIn =async (request,response,next)=>{
    try {
        const key = process.env.JWT_KEY;
        const decode = jwt.verify(request.headers.authorization,key);
        request.user = decode
        next()
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (request,response,next)=>{
    try {
        const user = await userModel.findById(request.user._id)
        if(user.role !==1) return response.status(401).send({
            success:false,
            massage:"User is unauthorized"
        })
        else{
            next()
        }
    } catch (error) {
        console.log(error)

        response.status(401).send({
            success:false,
            massage:"Error in admin middleware",
            error
        })
    }
}