import React from 'react'
import {Outlet} from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { useAuth } from '../../Contexts/AuthorizationContext'
const AdminRoute = () => {
    const [auth,setAuth] = useAuth()
    return auth?.user?.role === 1 ? <Outlet/> : <Spinner path='' loc='home page'/>
}

export default AdminRoute