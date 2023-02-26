import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from './Sidebar'

export default function Dashboard() {
    const sidebar = useRef(null)
    return (
                <div className='dashboard'>
                    <Outlet />
                </div>
    )
}
