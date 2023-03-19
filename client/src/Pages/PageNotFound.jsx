import React from 'react'
import Layout from '../components/Layout/Layout'
import {Link} from 'react-router-dom'
const PageNotFound = () => {
  return (
    <Layout>
        <div className='d-flex justify-content-center align-items-center' style={{minHeight:'70vh'}}>
          <div className='text-center'>
            <h1 className='display-1 text-bold'>404</h1>
            <p>
              Page not found :( 
            </p>
            <Link className='pnf' to='/'>
                Go Back
            </Link>
          </div>
        </div>
    </Layout>
  )
}

export default PageNotFound