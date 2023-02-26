import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function Auth() {
  return (
    <div className='dashboard'>
      <Outlet />
    </div>
  )
}
