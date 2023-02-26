import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function UserProfile(props) {
  // const navigate = useNavigate()
  const [massage, setMassage] = useState()
  const [isLoding, setIsLoding] = useState()
  const location = useLocation()
  let userDetails = {
    email: location?.state?.email,
    firstname: location?.state?.name?.firstname,
    lastname: location?.state?.name?.lastname,
    city: location?.state?.address?.city,
    street: location?.state?.address?.street,
    number: location?.state?.address?.number,
    zipcode: location?.state?.address?.zipcode,
    lat: location.state.address.geolocation.lat,
    long: location.state.address.geolocation.long,
    phone: location.state.phone
  }

  const { values, errors,touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: userDetails,
    onSubmit: async () => {
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
      
      let res = await fetch(`${process.env.React_App_API_URL}/users/${location.state._id}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }
      })

      let result = await res.json()


      if (result.status === 200) {
        setMassage("")
        setIsLoding(false)
        alert("User details updated Successfully")
      } else {
        setIsLoding(false)
        alert(result.status)
        setMassage(result.message)
      }
    }
  })

  console.log(values)
  return (
    <div className='container'>
    {isLoding && <h1 className='loader'><span className='loader-image'><img src="./assetes/loader/Spinner-1s-200px.svg" /></span></h1>}
    <div className='signup width-80'>
        <h1>Update Profile</h1>
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
                <button type='submit' className='btn-signup'>Update</button>
            </div>
        </form>
    </div>
</div>
  )
}
