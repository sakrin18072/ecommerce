import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../Contexts/AuthorizationContext'
import UserPanel from './UserPanel'

const UserDashboard = () => {
  const [auth, setAuth] = useAuth()

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4 p-4">
            <UserPanel />
          </div>
          <div className="w-3/4 p-4 bg-white rounded ">
            <h4 className="text-2xl font-bold mb-4">User Name: {auth?.user?.name}</h4>
            <p className="mb-2">Email: {auth?.user?.email}</p>
            <p className="mb-2">Phone: {auth?.user?.phone}</p>
            <p className="mb-2">Address: {auth?.user?.address}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard;
