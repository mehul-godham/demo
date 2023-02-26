import * as Yup from 'yup'


export const signupSchema = Yup.object({
    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please Enter valid email").required("Please Enter your email"),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,32}$/, "invalid password").required("Please Enter password"),
    confirmPassword: Yup.string().required("Please Enter confirm password").oneOf([Yup.ref("password"), null], "Password does not match"),
    firstname: Yup.string().required("Please Enter firstname"),
    lastname: Yup.string().required("Please Enter lastname"),
    city: Yup.string().required("Please Enter city"),
    street: Yup.string().required("Please Enter street"),
    number: Yup.number().required("Please Enter house number"),
    zipcode: Yup.string().required("Please Enter zipcode"),
    lat: Yup.string().required("Please Enter latitude"),
    long: Yup.string().required("Please Enter longitude"),
    phone: Yup.string().required("Please Enter contact number"),
})

export const loginSchema = Yup.object({
    email: Yup.string().required("Enter username"),
    password: Yup.string().required("Enter password")
})

export const productSchema = Yup.object({
    title: Yup.string().required("Please enter Product title"),
    price: Yup.number().required("Please enter price"),
    description: Yup.string().required("Please enter product descreaption"),
    image: Yup.string().required("Please select product image"),
    category: Yup.string().required("Please enter product catagory"),
})