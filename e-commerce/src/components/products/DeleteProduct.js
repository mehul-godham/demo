import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TokenContext } from '../../helper/TokenContext'

export default function DeleteProduct() {

  const navigate = useNavigate()
  const [isLoding, setIsLoding] = useState()
  const location = useLocation()
  const { isToken, setIsToken } = useContext(TokenContext)
  useEffect(() => {
    if (!isToken) {
      navigate("/login")
    }
  }, [isToken])

  useEffect(() => {
    setIsLoding(true)
    fetch(`${process.env.React_App_API_URL}/products/${location.state._id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        setIsLoding(false)
        alert("Product deleted successfully")
        navigate("/products")
      })
  }, [])
  return (
    <div>{isLoding && <h1 className='loader'><span className='loader-image'><img src="./assetes/loader/Spinner-1s-200px.svg" /></span></h1>}</div>
  )
}
