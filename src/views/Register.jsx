import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../components/Loader/Loader'
import { Link } from 'react-router-dom'

const Register = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ photo, setPhoto ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    
    const navigate = useNavigate()

    const registerHandler = async () => {

        setIsLoading(true)

        const data = { email, username, password, photo }
        const url = 'https://coderserver-1cn9.onrender.com/api/sessions/register'
        const response = await axios.post(url, data, { withCredentials: true })

        console.log('Response en register: ', response)

        setIsLoading(false)

        if(response?.data.statusCode === 201) {
            Swal.fire({
                title: 'Register',
                text: 'Successful registration!',
                icon: 'success'
            })
            setTimeout(()=>{
                navigate('/verify')
            }, 2500)
        }
        else{
            Swal.fire({
                title: 'Register fails!',
                text: response.data.message,
                icon: 'error'
            })
        }

    }
    
    return(
        <div className="flex flex-col justify-center items-center h-[100vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/bg%2Fbg2.webp?alt=media&token=1b5d7a5c-de3b-40d6-9da3-9b8592b82ba6')] bg-cover bg-fixed">
            { isLoading && <Loader/> }
            <h1 className="text-white text-center my-2">Create your account.</h1>
            <div className="flex justify-center">
                <div className="p-12 bg-glass backdrop-blur-sm rounded rounded-xl">
                    <div className="card-header">
                        <h3 className="text-white text-center mb-4">Sign Up</h3>
                    </div>
                    <div className="card-body">
                        <form id="login_form" className="flex flex-col gap-8 items-between justify-center">
                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="email">
                                    <img className="h-[25px]" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Femail_icon.svg?alt=media&token=7c14184b-df41-40e9-abff-89b7a3397890" alt="Email Icon" />
                                </label>
                                <input id="email"
                                    name="email"
                                    type="text"
                                    placeholder="type your e-mail"
                                    className="text-white h-16 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']" 
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="username">
                                    <img className="h-[25px]" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fuser_icon.svg?alt=media&token=fde90760-8809-46a5-a0ed-1ac290ddd72b" alt="User icon" />
                                </label>
                                <input id="username" 
                                    name="username"
                                    type="text" 
                                    placeholder="enter an username" 
                                    className="text-white h-16 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']" 
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="password">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fpass_icon.svg?alt=media&token=a0276f2b-158a-43e8-86aa-a7fa001d6421" alt="Password Icon" className="h-[25px]" />
                                </label>
                                <input id="password" 
                                    name="password"
                                    type="password"
                                    className="text-white h-16 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']" placeholder="create a password" 
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}    
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="photo_url">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fcamera_icon.svg?alt=media&token=4010a93c-65e3-47db-96ea-90684df59179" alt="Camera Icon" className="h-[25px]" />
                                </label>
                                <input id="photo_url"
                                    name="photo_url"
                                    type="text"
                                    placeholder="Paste url photo"
                                    className="text-white h-16 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']" 
                                    value={photo}
                                    onChange={(e) => {setPhoto(e.target.value)}}
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <button id="btn_register"
                                    type="button"                                    
                                    className="green_button text-button"
                                    onClick={registerHandler} >
                                    Register
                                </button>
                            </div>

                            <div className="flex flex-col justify-center items-center mt-2">
                                <h6 className="text-green text-button">
                                    Register with your social media account
                                </h6>
                                <div className="flex gap-3 justify-center items-center">
                                    <button type="button" className="image_button" >
                                        <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fgoogle_green_icon.svg?alt=media&token=1dfb9d68-d3f4-4b07-874b-42aa14002e40" alt="Google Icon" className="h-[25px]" />
                                    </button>
                                    <button type="button" className="image_button" >
                                        <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fgithub_green_icon.svg?alt=media&token=4e64c6f3-0bf5-4748-bef0-9ac29a81142d" alt="GitHub Icon" className="h-[25px]" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="bg-transparent">
                        <div className="flex justify-center links text-white text-button">
                            Do you have an account?
                            <a href="/login" className="text-csGreen text-button ms-4" style={{  textDecoration: 'none', }} >
                                go Login
                            </a>
                        </div>
                        <div className="flex justify-center">                            
                            <a href="#" className="text-csGreen text-button ms-4" style={{ textDecoration: 'none', }} >
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register