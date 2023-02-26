import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../helper/TokenContext'
import ProductCard from './ProductCard'

export default function Home() {
  const [products, setProducts] = useState();
  const [scrolled, setScrolled] = useState(10);
  let [productArray, setProductArray] = useState()


  // Fetching data from api and set products state 
  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await fetch(`${process.env.React_App_API_URL}/products`)
        let result = await res.json()
        if (result) {
          setProducts(() => (result))
        }
      } catch {
        console.log('something went wrong')
      }
    }
    fetchProducts()
  }, [])

  // Scroll eventlistner function
  function scrollEvent() {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 50) {
      setScrolled((prevScroll) => prevScroll + 10)
    }
  }

  // Use add event listener for scroll
  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)
    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [])

  // Populate productArray with new data 
  useEffect(() => {
    products && setProductArray(products.slice(0, scrolled))
  }, [scrolled, products])

  // looping through productArray and returning product cards
  let displayProducts = productArray && productArray.map((product,index) => <ProductCard key={index} productObj={product} />)

  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='products-container'>
          {displayProducts}
        </div>
      </div>
    </div>
  )
}
