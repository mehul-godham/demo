import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from '../helper/TokenContext'

export default function Navbar(props) {
  const { isToken, setIsToken, setUserValidation } = useContext(TokenContext)

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem("user")
    setUserValidation(false)
    setIsToken(false)
  }
  let user;
  if (isToken) {
    user = JSON.parse(localStorage.getItem("user"))
  }

  return (
    <>
      <header>
        <div className='container'>
          <nav className='navbar'>
            <div className='nav-links' onClick={() => props?.openSidebar()}>
              <div name="hamburger" className='hamburger ' ></div>
            </div>
            <div className='nav-links menu'>
              <Link className='links' to="/">Home</Link>
            </div>
            {isToken ?
              <div className='nav-links user-nav'>
                <div className='user'>
                  <i className='user-image'><img src="./assetes/icons/user.png" /></i>
                  <h3>
                    <Link to="/userprofile" state={user}>
                      {user?.name?.firstname}  {user?.name?.lastname}
                    </Link>
                  </h3>
                </div>
                <Link className='links menu' onClick={() => handleLogout()} >Logout</Link>
              </div> :
              <div className='nav-links'>
                <Link className='links' to="/signup">Signup</Link>
                <Link className='links' to="/login">Login</Link>
              </div>}
          </nav>
        </div>
      </header>
    </>
  )
}
