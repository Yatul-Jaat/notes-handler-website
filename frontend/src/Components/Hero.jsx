import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
        <Header />
        <Outlet/>
    </div>
  )
}

export default Hero