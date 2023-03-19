import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout>
      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center" style={{minHeight:'70vh'}}>
          <div >
              <img className='m-4' style={{height:'40vh',maxWidth:'60vw',borderRadius:'25px'}} src="https://t3.ftcdn.net/jpg/02/44/56/70/240_F_244567019_SRb5i27LHFzblS6dpOhDUu8nsdRgmgh5.jpg" />
          </div>
          <div className="w-100">
            <div className='d-flex flex-column justify-content-center align-items-center' style={{overflowY:'scroll'}}>
              <h1>About us</h1>
              <p className='p-5' style={{fontSize:'small'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo possimus animi excepturi, eligendi voluptatum commodi porro molestias sequi saepe, distinctio nisi a quas maxime tempore recusandae adipisci velit voluptates nobis perferendis at deserunt? Voluptates cum quia ullam at a, error, excepturi, ea odit ipsum labore aperiam aliquid libero alias delectus non accusamus autem fuga nihil nemo incidunt? Delectus repudiandae consectetur sapiente odio, optio nobis dolore quia eaque quasi soluta voluptatem quo asperiores distinctio nostrum et temporibus dolores enim sed aliquam provident praesentium vero minus voluptate! Numquam atque voluptates repellat beatae possimus optio maxime consectetur non, voluptatibus magnam, odit ut itaque.</p>

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default About