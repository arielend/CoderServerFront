import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader/Loader.jsx'

const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const navigate = useNavigate()

    const loginHandler = async () => {

        setIsLoading(true)       

        const data = { email, password }
        const options = {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true
        }
        const url = 'https://coderserver-1cn9.onrender.com/api/sessions/login'
        const response = await axios.post(url, data, options)
        setIsLoading(false)

        if(response?.data.statusCode === 200) {

            setTimeout(()=>{            
                navigate('/')            
            }, 2000)
    
            Swal.fire({
                title: response.data.message,
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
				confirmButtonColor: "#ff3b3c",
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
            })        
        }
        else{
            if(response.data.message == 'The user is not verified!'){
                Swal.fire({
                    title: response.data.message,
                    icon: "error",                    
                    confirmButtonColor: "black",
                    confirmButtonText: "Verify account!",
                    customClass:{
                        confirmButton: 'green_button'
                    }                    
                }).then((result) => {
                    if (result.isConfirmed) {
                            navigate('/verify')
                    }
                })
            }
            else{
                Swal.fire({
                    title: response.data.message,
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
                })
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/bg%2Fbg3.webp?alt=media&token=02ab5478-a99d-44cc-83b5-feaddf537aa7')] bg-cover bg-fixed">
            { isLoading && <Loader/> }
            <h1 className="text-white text-center my-2">Login page</h1>
            <div className="flex justify-center">
                <div className="p-6 bg-glass backdrop-blur-sm rounded rounded-xl">
                    <div className="card-header">
                        <h3 className="text-white text-center mb-2">Sign In</h3>
                    </div>
                    <div className="card-body">
                        <form id="login_form" className="flex flex-col gap-4 items-between justify-center">
                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="email">
                                    <img className="h-[25px]" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Femail_icon.svg?alt=media&token=7c14184b-df41-40e9-abff-89b7a3397890" alt="Email Icon" />
                                </label>
                                <input id="email"
                                    name="email"
                                    type="text"
                                    placeholder="e-mail"
                                    className="text-white h-12 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>
                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="password">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fpass_icon.svg?alt=media&token=a0276f2b-158a-43e8-86aa-a7fa001d6421" alt="Password Icon" className="h-[25px]" />
                                </label>
                                <input id="password"
                                    name="password"
                                    type="password"
                                    autoComplete='current-password'
                                    className="text-white h-12 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                            <div className="flex gap-4 justify-center items-center">
                                <button id="btn_login"
                                    type="button"
                                    className="green_button text-button"
                                    onClick={loginHandler} >
                                    Login
                                </button>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-2">
                                <h6 className="text-green text-button">
                                    Login with your social media account
                                </h6>
                                <div className="flex gap-3 justify-center items-center">
                                    <Link to={"/api/sessions/google"} className="image_button" >
                                        <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fgoogle_green_icon.svg?alt=media&token=1dfb9d68-d3f4-4b07-874b-42aa14002e40" alt="Google Icon" className="h-[25px]" />
                                    </Link>
                                    <button type="button" className="image_button" >
                                        <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fgithub_green_icon.svg?alt=media&token=4e64c6f3-0bf5-4748-bef0-9ac29a81142d" alt="GitHub Icon" className="h-[25px]" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="bg-transparent">
                        <div className="flex justify-center links text-white text-button">
                            Don't have an account?
                            <Link to={'/register'} className="text-csGreen text-button ms-4 no-underline" title="Sign Up">
                                Sign Up
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <Link to={'/password'} className="text-csGreen text-button ms-4 no-underline" title="Forgot">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
