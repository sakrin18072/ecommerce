import React from 'react'
import UserPanel from './UserPanel'
import Layout from '../../components/Layout/Layout'
const ChangePassword = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 m-3">
            <UserPanel/>
          </div>
          <div className="col-8">
            Change Password
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ChangePassword