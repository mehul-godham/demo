import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../helper/TokenContext'
import { useFormik } from 'formik'
import { loginSchema } from '../../schemas'



export default function Login() {
  const [massage, setMassage] = useState("")
  const navigate = useNavigate()
  const [isLoding, setIsLoding] = useState()
  const login = {
    email: "",
    password: ""
  }

  const { setIsToken } = useContext(TokenContext)

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: login,
    validationSchema: loginSchema,
    onSubmit: () => {
      setIsLoding(true)

      fetch(`${process.env.React_App_API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(json => {
          if (json.status === 200) {
            setMassage("")
            localStorage.setItem("token", json.token)
            localStorage.setItem("user", JSON.stringify(json.user))
            setIsToken(true)
            setIsLoding(false)
            navigate("/")
          } else {
            setIsLoding(false)
            setMassage(json.massage)
          }
        })
        .catch((err) => {
          setMassage(err)
        })
    }
  })

  return (
        <div className='container'>
          {isLoding && <h1 className='loader'><span className='loader-image'><img src="./assetes/loader/Spinner-1s-200px.svg" /></span></h1>}
          <div className='signup add-product width-50' style={{ "width":"400px" }}>
            <h1>Login</h1>
            <h4 className='error-message'>{massage}</h4>
            <form className='signup-form' onSubmit={handleSubmit}>
              <div className='personal-info'>
                <div className='input-container'>
                  <div className='form-inputs'>
                    <label>Email</label>
                    <input type="text" name="email" value={values.email} placeholder="Enter Email" onChange={handleChange} onBlur={handleBlur} />
                    {touched.email && <span className='error-message'>{errors?.email}</span>}
                  </div>
                </div>
                <div className='input-container'>
                  <div className='form-inputs'>
                    <label>Password</label>
                    <input type="password" placeholder='Enter Password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                    {touched.password && <span className='error-message'>{errors?.password}</span>}
                  </div>
                </div>
                <button type='submit' className='btn-signup'>Login</button>
              </div>
            </form>
          </div>
        </div>
  )
}
