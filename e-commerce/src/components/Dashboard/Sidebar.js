import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from '../../helper/TokenContext'
import AddProducts from '../products/AddProducts'
import ShowAllProduct from '../products/ShowAllProduct'

export default function Sidebar(props) {
  const { isToken } = useContext(TokenContext)
  return (
    <React.Fragment>
      <div className='close-sidebar-container' onClick={props.closeSidebar}>
      <div className='close-sidebar'></div>
      </div>

      <div className='hide sidebar-links'>
        <div className='sidebar-header'>Menu</div>
        <div className='sidebar-content'>
          <Link className='links' to="/">Home</Link>
          <Link className='links' to="/about">About us</Link>
          <Link className='links' to="/contact">Contact us</Link>
        </div>
      </div>
      {isToken &&
          <div className='sidebar-links'>
            <div className='sidebar-header'>Products</div>
            <div className='sidebar-content'>
              <Link to="/products" element={<ShowAllProduct />}>Show all Products</Link>
              <Link to="/addproducts" element={<AddProducts />}>Add new product</Link>
            </div>
          </div>
        
      }    </React.Fragment>
  )
}
