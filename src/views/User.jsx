import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../components/Loader/Loader.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const User = () => {

    const [ user, setUser ] = useState({online:false})
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        const userCookie = Cookies.get('user')
        if(userCookie){
            const userData = JSON.parse(userCookie)
            const _id = userData._id

            if(_id){
                const url = `https://coderserver-1cn9.onrender.com/api/users/${_id}`
                axios.get(url,{withCredentials:true})
                .then((response) => {            
                    setIsLoading(false)            
                    setUser(response.data.response)
                })
                .catch(error => console.log(error))
            }
            else{
                console.log('User ID not found')
                setIsLoading(false)
            }
        }
        else{
            console.log('Cookie not found')
            setIsLoading(false)
        }
    },[])

    const NavigateToMyProducts = () => {
        navigate('/products/me')
    }

    return(
        <div className="flex flex-col justify-start items-center h-[70vh]">
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold">User Profile</h2>
            {isLoading && <Loader/>}
            <div className="flex flex-col m-16">
                <div className="flex justify-center">
                    <div className="flex">
                        <div className="profileCard p-3 py-4 bg-white">
                            <div className="flex justify-center items-center mb-2">
                                <img src={user.photo} className="rounded rounded-full w-[150px]" />
                            </div>

                            <div className="text-center">
                                <span className="bg-black p-1 px-4 rounded rounded-lg text-white">{user.role}</span>
                                <h5 className="text-black font-bold">{user.username}</h5>
                                <span className='text-black'>{user.email}</span>

                                <div className="px-4 m-4">
                                    <p className="text-button text-black">{user.bio}</p>
                                </div>
                                {/* Admin user control */}
                                {
                                    user.role == 'admin' &&
                                    <div className="flex gap-4 mx-16">                                    
                                        <button className="green_button text-button w-[200px]">Manage products</button>
                                        <button className="green_button text-button w-[200px]">Change password</button>
                                    </div>
                                }

                                {/* Admin user control */}
                                {
                                    user.role == 'prem' &&
                                    <div className="flex gap-4 mx-16">                                    
                                        <button className="green_button text-button w-[200px]">My billing info</button>
                                        <button className="green_button text-button w-[200px]" onClick={NavigateToMyProducts}>My products</button>
                                        <button className="green_button text-button w-[200px]">Change password</button>
                                    </div>
                                }

                                {/* Admin user control */}
                                {
                                    user.role == 'customer' &&
                                    <div className="flex gap-4 mx-16">                                    
                                        <button className="green_button text-button w-[200px]">My billing info</button>
                                        <button className="green_button text-button w-[200px]">Change password</button>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User