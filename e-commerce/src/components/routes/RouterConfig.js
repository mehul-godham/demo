import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Signup from '../user/Signup'
import Login from '../user/Login'
import { TokenContext } from '../../helper/TokenContext'

import Home from '../Dashboard/Home'
import ShowAllProduct from '../products/ShowAllProduct'
import AddProducts from '../products/AddProducts'
import EditProduct from '../products/EditProduct'
import DeleteProduct from '../products/DeleteProduct'
import Dashboard from '../Dashboard/Dashboard'
import Auth from '../user/Auth'
import UserProfile from '../user/UserProfile'



export default function RouterConfig() {
  const { isToken, setIsToken } = useContext(TokenContext)

  return (
    <>
     
      <Routes>
        <Route path='/' element={<Home />} />
        {!isToken ?
          // Before Login 
          <Route path="/" element={<Auth />} >
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Login />} />
          </Route> :
          // After Admin Login
          <Route path="/" exact element={<Dashboard />} >
            <Route path="/products" element={<ShowAllProduct />} />
            <Route path="/userprofile" element={<UserProfile/>} />
            <Route path="/addproducts" exact element={<AddProducts />} />
            <Route path="/editproducts" exact element={<EditProduct />} />
            <Route path="/deleteproducts" exact element={<DeleteProduct />} />
            <Route path="/*" element={<h1 className='container'>Page not found</h1>} />
          </Route>}
      </Routes>
    </>
  )
}
