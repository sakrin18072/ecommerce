import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../Contexts/AuthorizationContext'
import AdminPanel from './AdminPanel'

const AdminDashboard = () => {
  const [auth,setAuth] = useAuth()
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 m-3">
            <AdminPanel/>
          </div>
          <div className="col-8 m-3 class-2">
            <h4>Admin Name: {auth?.user?.name}</h4>
            <p>Email: {auth?.user?.email}</p>
            <p>Phone: {auth?.user?.phone}</p>
            <p>Address: {auth?.user?.address}</p>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard