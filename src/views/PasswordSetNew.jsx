import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../components/Loader/Loader'
import { Link } from 'react-router-dom'

const PasswordSetNew = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ verifyCode, setVerifyCode ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    
    const navigate = useNavigate()

    const savePasswordHandler = async () => {

        setIsLoading(true)

        const data = { email, password, verifyCode }
        const url = 'https://coderserver-1cn9.onrender.com/api/sessions/password'
        const response = await axios.put(url, data, { withCredentials: true })

        console.log('El response en save pass: ', response)

        if(response?.data.statusCode !== 204){
            Swal.fire({
                title: 'Error',
                text: response.data.message,
                icon: 'error'
            })
        }

        if(response?.data.statusCode === 204) {
            Swal.fire({
                title: 'Succes',
                text: response.data.message,
                icon: 'success',
                timer: 2500,
                timerProgressBar: true
            })
            setTimeout(()=>{
                navigate('/login')
            }, 2500)
        }
        
        setIsLoading(false)
    }
    
    return(
        <div className="flex flex-col justify-center items-center h-[100vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/bg%2FSite_BG.webp?alt=media&token=7ac589cc-94df-4ee6-b1ff-814d81296ff0')] bg-cover bg-fixed">
            { isLoading && <Loader/> }
            <h1 className="text-white text-center my-2">Change password</h1>
            <div className="flex justify-center">
                <div className="p-12 bg-glass backdrop-blur-sm rounded rounded-xl">
                    <div className="card-header">
                        <h3 className="text-white text-center mb-4">Create a new password</h3>
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
                                    className="text-white h-12 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']" 
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="verifyCode">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fcode_icon.svg?alt=media&token=520ac56f-e5a9-4b6d-98bb-12ce32e22279" alt="Code Icon" className="h-[25px]" />
                                </label>
                                <input id="verifyCode"
                                    name="verifyCode"
                                    type="text"
                                    className="text-white h-12 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']"
                                    placeholder="Verify code"
                                    value={verifyCode}
                                    onChange={(e) => {setVerifyCode(e.target.value.trim())}}
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="password">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fpass_icon.svg?alt=media&token=a0276f2b-158a-43e8-86aa-a7fa001d6421" alt="Password Icon" className="h-[25px]" />
                                </label>
                                <input id="password" 
                                    name="password"
                                    type="password"
                                    className="text-white h-12 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']" placeholder="create a password" 
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}    
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <button id="btn_savePassword"
                                    type="button"                                    
                                    className="green_button text-button"
                                    onClick={savePasswordHandler} >
                                    Save password
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className="bg-transparent">
                        <div className="flex justify-center links text-white text-button">
                            Do you have an account?                            
                            <Link to={'/login'} className='text-csGreen text-button ms-4 no-underline' title='go login'>
                                Go login
                            </Link>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordSetNew