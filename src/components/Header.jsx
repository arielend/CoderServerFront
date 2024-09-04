import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const Header = () => {

	const [user, setUser ] = useState({online: false})
	const navigate = useNavigate()

    const getUserFromCookie = () => {
        try {
            console.log('Que onda el user en cookie?');
            const userData = Cookies.get('user')
            if(userData) {
                return JSON.parse(userData)
            }
        } catch (error) {
            console.error('Error parsing user data from cookie:', error)
            return null
        }
    }

	useEffect(()=>{
        const userFromCookie = getUserFromCookie()
        console.log('El user en la cookie: ', userFromCookie)
		if(userFromCookie){
            setUser(userFromCookie)
		}}, []
	)

	const signoutHandler = async () => {

        setUser({online:false})		
        const url = 'https://coderserver-1cn9.onrender.com/api/sessions/signout'
        const response = await axios.post(url, {}, { withCredentials: true })

        console.log('El response de signout: ', response)
        
		if(response?.data.statusCode === 200) {
            setTimeout(()=>{            
                Cookies.remove('user')
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

        if(response?.data.statusCode === 401) {
            Swal.fire({
                title: 'Signout error!', 
                icon: "error",
                text: response.data.message,
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: "#ff3b3c",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false
            })
        }
	}
    
	return (
        <header className="flex justify-between items-center w-full py-4 px-6 ">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2FHeaderCS.svg?alt=media&token=276c81fb-3c81-4937-90a9-584b030b3311"
                        className="h-20 me-12" />
                </Link>
                <ul className="flex gap-8 text-csGreen">
                    <li>
                        <Link to={'/products'} className="nav_link" title="Products" >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to={'/chat'} className="nav_link" title="chat">
                            Chat
                        </Link>
                    </li>
                    {
						user.role == 'admin' &&
                        <li>
                            <Link to={'/createProducts'} className="nav_link" title="createProduct" >
                                Create Product
                            </Link>
                        </li>
                    }
                </ul>
            </div>
            <div>
                <ul className="flex gap-8 items-center">
                    {user.online ? (
                        <>
							{
								user.role != 'admin' &&
								<li>
									<Link to="/cart">
										<img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fcart_icon.svg?alt=media&token=4bdd38d2-fcf3-41bd-8c88-02116bf5ccb1"
											className="h-16" />
									</Link>
								</li>
							}
                            <li>
                                <Link to="/profile" className='flex flex-col justify-center items-center'>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fuser_icon.svg?alt=media&token=fde90760-8809-46a5-a0ed-1ac290ddd72b"
                                        className="h-12" />
									<span>{user.role != 'admin' && user.username}</span>
									<h6 className='font-bold'>{user.role == 'admin' && user.role.toUpperCase()}</h6>
                                </Link>
                            </li>
                            <li>
                                <button id="btn_signout" title="signout" onClick={() => { signoutHandler() }} >
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Flogout_icon.svg?alt=media&token=2ba042b8-c695-4db9-a116-23278c7758ed"
                                        className="h-14" />
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Flogin_icon.svg?alt=media&token=707dea11-21eb-428e-ac87-011bbea3e0fc" 
                                        className="h-16" />
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    )
}

export default Header