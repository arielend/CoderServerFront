import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CartItem from '../components/CartItem'
import Cookies from 'js-cookie'
import axios from 'axios'

const Cart = () => {

    const [ userCarts, setUserCarts ] = useState([])
    const [user, setUser ] = useState({online: false})
	const userData = Cookies.get('user')

    useEffect(()=>{
        if(userData){
            setUser(JSON.parse(userData))
        }
    },[userData])

    useEffect(async ()=>{
        const url = 'http://localhost:9000/api/carts'
        const response = await axios.get(url, { withCredentials: true })
        
        console.log('El response en cart: ', response)       

    },[])

    return (
        <div className="flex justify-start flex-col items-center gap-4 h-[60vh]">
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold"> Cart </h2>
            
            <div className="flex flex-col p-4 gap-2 justify-center">

                    <div className="flex justify-end bg-black p-2 text-csGreen">
                        <span>
                            Total: <b className="text-white"> ${3000} </b>{' '}
                        </span>
                    </div>

                    <div className="flex justify-between bg-black p-2 gap-2">
                        <input
                            type="text"
                            className="bg-white rounded rounded-lg px-2 w-[70%]"
                            placeholder="discount code/gift card"
                        />
                        <button className="green_button w-[30%]" type="button">
                            Apply
                        </button>
                    </div>

                    <div className="flex justify-between bg-black p-2 gap-2">
                        <button
                            id="btn_proceedPay"
                            onClick={()=>{proceedPay()}}
                            className="green_button"
                            type="button"
                        >
                            Proceed to Pay
                        </button>
                        <Link to={'/products'} className="green_button">
                            Continue shopping!
                        </Link>
                        <button
                            id="btn_clearCart"
                            onClick={()=>{clearCart()}}
                            className="green_button"
                            type="button"
                        >
                            <b>Clear cart</b>
                        </button>
                    </div>

                    {/* <div className="flex justify-center p-4 gap-4 " style="min-height: 400px;" >
                        <h2>It look'a like your cart is empty!</h2>
                        <h3>A great chance to put some cool stuffs inside!</h3>
                        <Link to={"/"}> Go shopping!</Link>                            
                    </div> */}
                </div>
            </div>
        
    )
}

export default Cart