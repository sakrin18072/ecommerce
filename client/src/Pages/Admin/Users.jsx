import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from './AdminPanel'
const Users = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 m-3">
            <AdminPanel/>
          </div>
          <div className="col-8">
            Users
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users