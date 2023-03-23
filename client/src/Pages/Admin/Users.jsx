import axios from 'axios';
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from './AdminPanel'
import { useEffect } from 'react';
import moment from 'moment';
const Users = () => {
  const [users,setUsers] = useState([]);
  const fetchAllUsers = async()=>{
    try {
      const {data} = await axios.get('/api/v1/auth/users');
      setUsers(data?.users);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchAllUsers();
  },[])
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 m-3">
            <AdminPanel/>
          </div>
          <div className="col-8">
            <h1 className='text-center m-3'>All users</h1>
            <div className="container border shadow mt-3">
              <table className='table'>
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Phone</th>
                  <th scope="col">CreatedAt</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user,index)=>(
                    <tr key={index}>
                      <th scope='row'>{index+1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{moment(user?.createdAt).format()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users