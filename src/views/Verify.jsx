import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const Verify = () => {

    const [ email, setEmail ] = useState('')
    const [ verifyCode, setVerifyCode ] = useState('')
    const navigate = useNavigate()

    const verify_handler = async () => {

        const data = { email, verifyCode }
        const url = 'https://coderserver-1cn9.onrender.com/api/sessions/verify'
        const response = await axios.post(url, data)
                
        if(response?.data.statusCode === 200) {
            navigate('/')
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/bg%2FSite_BG.webp?alt=media&token=7ac589cc-94df-4ee6-b1ff-814d81296ff0')] bg-cover bg-fixed">
            <h1 className="text-white text-center my-2">Account verification page</h1>
            <div className="flex justify-center">
                <div className="p-12 bg-glass backdrop-blur-sm rounded rounded-xl">
                    <div className="card-header">
                        <h3 className="text-white text-center mb-4">Verify</h3>
                    </div>
                    <div className="card-body">
                        <form id="verify_form" className="flex flex-col gap-8 items-between justify-center">
                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="email">
                                    <img className="h-[25px]" src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Femail_icon.svg?alt=media&token=7c14184b-df41-40e9-abff-89b7a3397890" alt="Email Icon" />
                                </label>
                                <input id="email"
                                    name="email"
                                    type="text"
                                    placeholder="e-mail"
                                    className="text-white h-16 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>
                            <div className="flex gap-4 justify-center items-center">
                                <label htmlFor="verifyCode">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fpass_icon.svg?alt=media&token=a0276f2b-158a-43e8-86aa-a7fa001d6421" alt="Password Icon" className="h-[25px]" />
                                </label>
                                <input id="verifyCode"
                                    name="verifyCode"
                                    type="verifyCode"
                                    className="text-white h-16 px-4 text-button rounded rounded-lg bg-['rgba(255, 255, 255, 0.379)'] box-shadow-['0 4px 30px rgba(0, 0, 0, 0.1)'] backdropBlur-['(5px)']"
                                    placeholder="Verify code"
                                    value={verifyCode}
                                    onChange={(e) => {setVerifyCode(e.target.value.trim())}}
                                />
                            </div>
                            <div className="flex gap-4 justify-center items-center">
                                <button type="button" id="btn_verify" className="green_button text-button" onClick={verify_handler} >
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="bg-transparent">
                        <div className="flex justify-center links text-white text-button">
                            I'm a verified user!
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

export default Verify
