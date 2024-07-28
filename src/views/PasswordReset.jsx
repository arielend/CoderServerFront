import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../components/Loader/Loader'

const PasswordReset = () => {

    const [ email, setEmail ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    
    const navigate = useNavigate()

    const sendEmailHandler = async () => {

        const mailRegex = /^\w+@\w+\.\w+$/

        if(mailRegex.test(email)){
            setIsLoading(true)

            const data = { email }
            const url = 'http://localhost:9000/api/sessions/password'
            const response = await axios.post(url, data, { withCredentials: true })

            console.log('El response en reset: ', response)

            if(response?.data.statusCode === 404) {
                setEmail('')
                Swal.fire({
                    title: 'User not found',
                    text: 'No account found with the email provided!',
                    icon: 'error',
                    timer: 2500,
                    timerProgressBar: true
                })                
            }           

            if(response?.data.statusCode === 200) {
                Swal.fire({
                    title: 'Info',
                    text: response.data.message,
                    icon: 'success',
                    timer: 2500,
                })
                setTimeout(()=>{
                    navigate('/setNew')
                }, 2500)
            }

            setIsLoading(false)
        } else {
            setEmail('')
            Swal.fire({
                title: 'Invalid',
                text: 'Something is wrong with the email format!',
                icon: 'error',
                timer: 2500,
                timerProgressBar: true
            })
        }
    }
    
    return(
        <div className="flex flex-col justify-center items-center h-[100vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/bg%2FSite_BG.webp?alt=media&token=7ac589cc-94df-4ee6-b1ff-814d81296ff0')] bg-cover bg-fixed">
            { isLoading && <Loader/> }
            <h1 className="text-white text-center my-2">Did you forget your Password?</h1>
            <div className="flex justify-center">
                <div className="p-12 bg-glass backdrop-blur-sm rounded rounded-xl">
                    <div className="card-header">
                        <h3 className="text-white text-center mb-4">Enter your registered email</h3>
                    </div>
                    <div className="card-body">
                        <form id="login_form" className="flex flex-col gap-8 items-between justify-center">
                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="email">
                                    <img className="h-[25px]" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Femail_icon.svg?alt=media&token=7c14184b-df41-40e9-abff-89b7a3397890" alt="Email Icon" />
                                </label>
                                <input id="email"
                                    name="email"
                                    type="email"
                                    placeholder="type your e-mail"
                                    className="text-white h-12 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']" 
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                <button id="btn_sendEmail"
                                    type="button"                                    
                                    className="green_button text-button"
                                    onClick={sendEmailHandler} >
                                    Send email
                                </button>
                            </div>
                            
                        </form>
                    </div>
                    <div className="bg-transparent">
                        <div className="flex justify-center links text-white text-button">
                            Did you remember it?
                            <a href="/login" className="text-csGreen text-button ms-4" style={{  textDecoration: 'none', }} >
                                go Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset