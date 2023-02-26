import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'

export default function ShowAllProduct() {
  const [products, setProducts] = useState([])
  const [isLoding, setIsLoding] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setIsLoding(true)
    fetch(`${process.env.React_App_API_URL}/products`)
      .then(res => res.json())
      .then(json => {
        setProducts(() => json)
        setIsLoding(false)
      })
  }, [currentPage])
  let displayProducts = 5
  let pageCount = Math.ceil(products.length / displayProducts);
  let pages = [...Array(pageCount).keys()]
  let pageProducts = products
  let filteredProduct = pageProducts.filter((product, index) => {
    return index + 1 >= (currentPage * displayProducts) - (displayProducts - 1) && index + 1 <= (currentPage * displayProducts)
  })

  let tr = filteredProduct.map((product, index) => {
    return (
      <tr key={index}>
        <td>{((currentPage * displayProducts) - (displayProducts - 1)) + index}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.description}</td>
        <td><img src={product.image} /></td>
        <td><Link to="/editproducts" state={product}>Edit</Link></td>
        <td><Link to="/deleteproducts" state={product}>Delete</Link></td>
      </tr>
    )
  })

  let pageButtons = pages.map((pagenumber, index) => {
    return (<button key={index} value={pageNumber + pagenumber} onClick={changePage}>{pageNumber + pagenumber}</button>)
  })
  function changePage(e) {
    let { value } = e.target
    setCurrentPage(value)
  }

  return (
    <div className="container">
      <div className='display-products'>
        <h1>
          Products
        </h1>
        {isLoding && <h1 className='loader'><span className='loader-image'><img src="./assetes/loader/Spinner-1s-200px.svg" /></span></h1>}
        {
          !isLoding &&
          <div className='product-table'>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tr}
              </tbody>
            </table>
            <div className='pagination'>
              {pageButtons}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
