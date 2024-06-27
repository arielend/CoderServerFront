import axios from 'axios'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

const User = () => {

    const [ user, setUser ] = useState({online:false})
    const [ loading, setLoading ] = useState(true)

    const token = Cookies.get("token")

    console.log('Mi token', token)

    useEffect(()=>{
        const fetchUrl = 'http://localhost:8080/api/sessions'
        
        axios(fetchUrl)
        .then((response) => {
            console.log(response.data)
            setUser(response.data)
        })
        .catch(error => console.log(error))
    },[])

    return(
        <div className="flex flex-col justify-start items-center h-[70vh]">
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold">User Profile</h2>

            <div className="flex flex-col m-16">
                <div className="flex justify-center">
                    <div className="flex">
                        <div className="profileCard p-3 py-4 bg-white">
                            <div className="text-center">
                                <img src="/#" className="rounded rounded-full w-full" />
                            </div>

                            <div className="text-center">
                                <span className="bg-white p-1 px-4 rounded rounded-lg text-white">Customer</span>
                                <h5 className="">Juan Cito</h5>
                                <span>juancito@mail.com</span>

                                <div className="px-4 m-4">
                                    <p className="text-button text-black"> I`m just a good customer. </p>
                                </div>
                            
                                <div className="flex gap-4 mx-16">                        
                                    <button className="green_button text-button">Billing info</button>
                                    <button className="green_button text-button">Profile info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User