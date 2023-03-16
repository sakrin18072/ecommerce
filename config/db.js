import mongoose from "mongoose";
const connectDB = async ()=>{
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error in MongoDB: ${error}`)
    }
}
export default connectDB;