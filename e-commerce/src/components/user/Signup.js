import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { signupSchema } from '../../schemas';

export default function Signup() {
    const navigate = useNavigate()
    const [massage, setMassage] = useState("")
    const [isLoding, setIsLoding] = useState()
    const userDetails = {
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        city: '',
        street: '',
        number: "",
        zipcode: '',
        lat: '',
        long: '',
        phone: '',
    }
    const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
        initialValues: userDetails,
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            let obj = {
                email: values.email,
                password: values.password,
                name: {
                    firstname: values.firstname,
                    lastname: values.lastname
                },
                address: {
                    city: values.city,
                    street: values.street,
                    number: values.number,
                    zipcode: values.zipcode,
                    geolocation: {
                        lat: values.lat,
                        long: values.long
                    }
                },
                phone: values.phone
            }
            setIsLoding(true)
            let res = await fetch(`${process.env.React_App_API_URL}/users`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json' }
            })

            let result = await res.json()


            if (result.status === 200) {
                setMassage("")
                setIsLoding(false)
                alert("Signup Successfull, Now Please login")
                navigate("/login")
            } else {
                setIsLoding(false)
                alert(result.status)
                setMassage(result.message)
            }
        }
    })

    return (
        <div className='container'>
            {isLoding && <h1 className='loader'><span className='loader-image'><img src="./assetes/loader/Spinner-1s-200px.svg" /></span></h1>}
            <div className='signup width-80'>
                <h1>Signup</h1>
                <h4 className='error-message'>{massage}</h4>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <div className='persional-info'>
                        <h2>Personal Information</h2>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>First name*</label>
                                <input type="text" name="firstname" placeholder='first name' value={values.firstname} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.firstname && <span className='error-message'>{errors?.firstname}</span>}
                            </div>
                            <div className='form-inputs'>
                                <label>Last name*</label>
                                <input type="text" name="lastname" placeholder='Last name' value={values.lastname} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.lastname && <span className='error-message'>{errors?.lastname}</span>}
                            </div>
                        </div>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Email*</label>
                                <input type="email" name="email" placeholder='Enter Email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.email && <span className='error-message'>{errors?.email}</span>}
                            </div>
                        </div>

                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Password*</label>
                                <input type="password" name="password" placeholder='Enter password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.password && <span className='error-message'>{errors?.password}</span>}
                            </div>
                            <div className='form-inputs'>
                                <label>Confirm password*</label>
                                <input type="password" name="confirmPassword" placeholder='Enter confirm pasword' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.confirmPassword && <span className='error-message'>{errors?.confirmPassword}</span>}
                            </div>
                        </div>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Contact number*</label>
                                <input type="text" name="phone" placeholder='Enter contact number' value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.phone && <span className='error-message'>{errors?.phone}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='address'>
                        <h2>Adderss*</h2>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>House number*</label>
                                <input type="number" name="number" placeholder='Enter house number' value={values.number} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.number && <span className='error-message'>{errors?.number}</span>}
                            </div>
                            <div className='form-inputs'>
                                <label>Street*</label>
                                <input type="text" name="street" placeholder='Enter street name' value={values.street} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.street && <span className='error-message'>{errors?.street}</span>}
                            </div>
                        </div>
                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>City*</label>
                                <input type="text" name="city" placeholder='Enter city' value={values.city} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.city && <span className='error-message'>{errors?.city}</span>}
                            </div>
                            <div className='form-inputs'>
                                <label>Zipcode*</label>
                                <input type="text" name="zipcode" placeholder='Enter zipcode' value={values.zipcode} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.zipcode && <span className='error-message'>{errors?.zipcode}</span>}
                            </div>
                        </div>

                        <div className='input-container'>
                            <div className='form-inputs'>
                                <label>Latitude*</label>
                                <input type="text" name="lat" placeholder='Enter longitude' value={values.lat} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.lat && <span className='error-message'>{errors?.lat}</span>}
                            </div>
                            <div className='form-inputs'>
                                <label>Longitude*</label>
                                <input type="text" name="long" placeholder='Enter latitude' value={values.long} onChange={handleChange} onBlur={handleBlur} />
                                {touched?.long && <span className='error-message'>{errors?.long}</span>}
                            </div>
                        </div>
                        <button type='submit' className='btn-signup'>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
