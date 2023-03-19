import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const formSubmit = async (data) => {
        try {
            var result = await axios.post(`/api/v1/auth/register`,data);
            if(result.data.success === true){
                navigate("/login")
                toast.success("Registered successfully");
                
            }
            else{
                toast.error(result.data.message);
            }
        } catch (error) {
            console.log(error.data.message)
            toast.error(result.data.message)
        }
        
    }
    return (
        <Layout>
            
            <form onSubmit={handleSubmit(formSubmit)}
            className='d-flex flex-column row-cols-3 justify-content-center align-items-center'
             style={{fontSize:'medium',color:'rgb(32, 115, 120)',minHeight:'70vh'}}
            >
                <h1 className='text-center m-3'>Register</h1>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" {...register('name',{required:true})} />
                </div>
                {errors.name && <p className='text-danger'>* This field is required</p>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" {...register('email',{required:true})} />
                </div>
                {errors.email && <p className='text-danger'>* This field is required</p>}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" {...register('password',{required:true,minLength:8})} />
                </div>
                {errors?.password?.type==='required' && <p className='text-danger'>* This field is required</p>}
                {errors?.password?.type==='minLength' && <p className='text-danger'>* Password must be atleast 8 characters long</p>}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" {...register('phone',{required:true})} />
                </div>
                {errors.phone && <p className='text-danger'>* This field is required</p>}
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" {...register('address',{required:true})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="answer" className="form-label">What's your favourite sport (security question)</label>
                    <input type="text" className="form-control" {...register('answer',{required:true})} />
                </div>
                {errors.answer && <p className='text-danger'>* This field is required</p>}
                <button type="submit" className="btn btn-- m-2">Let me in !</button>
            </form>

        </Layout>
    )
}

export default Register