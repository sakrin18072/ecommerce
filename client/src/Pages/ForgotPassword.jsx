import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthorizationContext'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [auth, setAuth] = useAuth()
    const formSubmit = async (data) => {
        try {
            console.log(process.env.SERVER_URL)
            const result = await axios.post(`/api/v1/auth/forgot-password`, data);
            if (result.data.success === true) {

                toast.success("Password reset successful");
                navigate("/login")
            }
            else {
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
                style={{ fontSize: 'medium', color: 'rgb(32, 115, 120)', minHeight: '70vh' }}
            >
                <h1 className='text-center m-3'>Forgot Password</h1>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" {...register('email', { required: true })} />
                </div>
                {errors.email && <p className='text-danger'>* This field is required</p>}
                <div className="mb-3">
                    <label htmlFor="answer" className="form-label">Security question's answer</label>
                    <input type="text" className="form-control" {...register('answer', { required: true })} />
                </div>
                {errors.answer && <p className='text-danger'>* This field is required</p>}
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" {...register('newPassword', { required: true, minLength: 8 })} />
                </div>
                {errors?.newPassword?.type === 'required' && <p className='text-danger'>* This field is required</p>}
                {errors?.newPassword?.type === 'minLength' && <p className='text-danger'>* Password must be atleast 8 characters long</p>}
                <button type="submit" className="btn btn-- m-2">Recover Account</button>
            </form>

        </Layout>
    )
}

export default ForgotPassword