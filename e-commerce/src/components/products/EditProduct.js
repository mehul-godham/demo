import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { productSchema } from '../../schemas';

export default function EditProduct() {
    const location = useLocation()
    const navigate = useNavigate()
    const [isLoding, setIsLoding] = useState()
    const [massage, setMassage] = useState("")

    const [productDetails, setProductDetails] = useState({
        title: location?.state?.title,
        price: location?.state?.price,
        description: location?.state?.description,
        image: location?.state?.image,
        category: location?.state?.category,
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: productDetails,
        validationSchema: productSchema,
        onSubmit: async () => {
            let obj = {
                "title": values.title,
                "price": values.price,
                "description": values.description,
                "image": "https://i.pravatar.cc",
                "category": values.category,
            }
            setIsLoding(true)

            let res = await fetch(`${process.env.React_App_API_URL}/products/${location.state._id}`, {
                method: "PUT",
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json' }
            })

            let result = await res.json()

            if (result.status === 200) {
                setMassage("")
                setIsLoding(false)
                alert("Product added successfully")
                navigate("/products")
            } else {
                setMassage(result.massage)
            }
        }
    })
    return (
        <div className='container'>
            <div className='signup add-product width-50'>
                <h4>{massage}</h4>
                <h1>Edit Product</h1>
                {isLoding && <h1 className='loader'><span className='loader-image'><img src="./assetes/loader/Spinner-1s-200px.svg" /></span></h1>}
                <form className='signup-form' onSubmit={handleSubmit}>
                    <div className='personal-info'>
                        <h2>Product Information</h2>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Product title</label>
                                <input type="text" name="title" placeholder='Enter product name' value={values.title} onChange={handleChange} onBlur={handleBlur} />
                                {touched.title && <span className='error-message'>{errors?.title}</span>}
                            </div>

                        </div>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Price</label>
                                <input type="number" name="price" placeholder='Enter Price' value={values.price} onChange={handleChange} onBlur={handleBlur} />
                                {touched.price && <span className='error-message'>{errors?.price}</span>}
                            </div>
                        </div>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Description</label>
                                <textarea type="text" name="description" placeholder='Enter Product description' value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                {touched.description && <span className='error-message'>{errors?.description}</span>}
                            </div>
                        </div>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Image</label>
                                <input type="file" name="image" placeholder='Enter password' />
                                {touched.image && <span className='error-message'>{errors?.image}</span>}
                            </div>
                        </div>

                        <div className='input-container'>

                            <div className='form-inputs'>
                                <label>Category</label>
                                <input type="text" name="category" placeholder='Enter Category' value={values.category} onChange={handleChange} onBlur={handleBlur} />
                                {touched.category && <span className='error-message'>{errors?.category}</span>}
                            </div>
                        </div>
                        <button className='btn-signup'>Edit Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
