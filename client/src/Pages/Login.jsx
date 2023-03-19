import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import { useAuth } from '../Contexts/AuthorizationContext'
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [auth,setAuth] = useAuth()
    const formSubmit = async (data) => {
        try {
            const result = await axios.post(`/api/v1/auth/login`,data);
            if(result.data.success === true){
                
                toast.success("Login successful");
                setAuth({
                    ...auth,
                    user:result.data.user,
                    token:result.data.token
                })
                localStorage.setItem('auth',JSON.stringify(result.data))
                navigate(location.state || "/")
            }
            else{
                toast.error(result.data.message);
            }
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <Layout>
            
            <form onSubmit={handleSubmit(formSubmit)}
            className='d-flex flex-column row-cols-3 justify-content-center align-items-center'
             style={{fontSize:'medium',color:'#212527',minHeight:'70vh'}}
            >
                <h1 className='text-center m-3'>Login</h1>
                
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
                
                <button type="button" onClick={()=>navigate('/forgot-password')} className="btn btn-- m-2">Forgot Password</button>
                <button type="submit" className="btn btn-- m-2">Login</button>
            </form>

        </Layout>
  )
}

export default Login