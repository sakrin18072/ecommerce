import React from 'react'
import Layout from '../components/Layout/Layout'
import {IoMdCall} from 'react-icons/io'
import {MdEmail} from 'react-icons/md'
const Contact = () => {
  return (
    <Layout>
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
          <div className="" >
              <img className='m-4' style={{maxHeight:'60vh',maxWidth:'50vw',borderRadius:'25px'}} src="https://as1.ftcdn.net/v2/jpg/03/79/34/22/1000_F_379342263_842oOug6XRGqjnnTuoCLYPiKmBq9MUyK.jpg" />
          </div>
          <div className="m-4 w-100">
            <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'70vh',fontSize:'small'}}>
              <h1>Contact-us</h1>
              <p><IoMdCall/>: 123456789</p>
              <p><MdEmail/>: sakrin@business.com</p>

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Contact