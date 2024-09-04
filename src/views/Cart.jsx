import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../components/Loader/Loader.jsx'
import CartItem from '../components/CartItem'
import Cookies from 'js-cookie'
import axios from 'axios'

const Cart = () => {

    const [ userCarts, setUserCarts ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ user, setUser ] = useState(() => {
        const userData = Cookies.get('user')
        return userData ? JSON.parse(userData) : { online: false }
    })
    
    useEffect(()=>{

        const fetchData = async () => {
            setIsLoading(true)
            const url = 'https://coderserver-1cn9.onrender.com/api/carts'
            const response = await axios.get(url, { withCredentials: true })
            console.log('El response al hacer el fetch de cart: ', response)
            if(response.data.statusCode = 200){
                setIsLoading(false)
                const newTotal = response.data.response.reduce((acc, item) => {
                    return acc + item.product_id.price * item.product_quantity
                }, 0)        
                setTotal(parseFloat(newTotal.toFixed(2)))            
                setUserCarts(response.data.response)
            }
        }
        fetchData()
    },[])

    const handleDeleteCart = async (cartId) => {
        try {
            setIsLoading(true)
            const url = `https://coderserver-1cn9.onrender.com/api/carts/${cartId}`
            const response = await axios.delete(url, { withCredentials: true })
            if(response.data.statusCode == 204) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showConfirmButton: false
                })
                setIsLoading(false)
                setUserCarts((prevCarts) => prevCarts.filter(cart => cart._id !== cartId))
                const updatedTotal = userCarts.reduce((acc, item) => {
                    return item._id !== cartId ? acc + item.product_id.price * item.product_quantity : acc
                }, 0)        
                setTotal(parseFloat(updatedTotal.toFixed(2)))
            }
            else{
                Swal.fire({
                    title: 'LOOK BEHIND YOU! A THREE HEADED MONKEY!',
                    icon: "warning",
                    timer: 2000,
                    toast: true
                })
            }    
        } catch (error) {
            console.error('Error al eliminar el carrito:', error)
        }
    }

    const handleProceedPay = async () => {
        try {
            setIsLoading(true)
            const url = 'https://coderserver-1cn9.onrender.com/api/payment'
            const response = await axios.post(url, {}, {withCredentials: true})
            console.log('El response.data al hacerr el checkout', response.data)
            if(response.data.statusCode == 200) {
                window.location.href = response.data.response.url            
            }
        } catch (error) {
            console.log('Error at pay attempt: ', error)
        }
    }

    const handleClearCart = async () => {
        try {
            setIsLoading(true)
            const url = 'https://coderserver-1cn9.onrender.com/api/clearCarts/clear'
            const response = await axios.delete(url, { withCredentials: true })
            if(response.data.statusCode == 204) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showConfirmButton: false
                })
                setIsLoading(false)
                setUserCarts([])
                setTotal(0)
            }
            else{
                setIsLoading(false)
                Swal.fire({
                    title: "Look behind you! A three headed monkey already took all your thing!",
                    icon: "warning",
                    timer: 3500,
                    timerProgressBar: true,                    
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showConfirmButton: false
                })
            }
        } catch (error) {
            console.error('Error al vaciar el carrito:', error)
        }
    }

    return (
        <div className="flex justify-start flex-col items-center gap-2">
            { isLoading && <Loader/>}
            <div className="w-[90vw] lg:w-[45vw] bg-csGreen border-2 border-black rounded rounded-lg">
                <h2 className="text-center text-black font-bold"> My cart </h2>
            </div>

            <div className="w-[90vw] lg:w-[45vw] flex flex-col justify-between align-center p-3 bg-black m-2 rounded  gap-2">
                {
                    (userCarts.length == 0) ?
                    <div className="flex flex-col justify-center items-center p-4 gap-4 text-white" >
                        <h2>It look'a like your cart is empty!</h2>
                        <h3>A great chance to put some cool stuffs inside!</h3>                        
                    </div>
                    :
                    userCarts.map((cart, index) => {
                    return (
                        <div key={index} className="flex justify-between bg-white px-2 rounded">
                            <div className="w-[20%]">
                                <img
                                    className="rounded"
                                    src={cart.product_id.photo}
                                    width="70"
                                />
                            </div>
                            <div className="w-[60%] flex flex-col items-start">
                                <h6 className="text-black text-[1.3rem]">
                                    {cart.product_id.title}
                                </h6>
                                <span className="text-grey text-[1.1rem]"> Cantidad: <b>{cart.product_quantity}</b></span>
                            </div>
                            <div className="w-[15%] flex flex-col justify-center">
                                <h4 className="text-black font-bold text-orange text-[1.4rem]"> $ {cart.product_id.price} </h4>
                            </div>
                            <div className="w-[5%] flex flex-col justify-center">
                                <button id="BTN_DeleteCart"
                                    value={cart._id}
                                    onClick={() => handleDeleteCart(cart._id)}>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Ftrash_icon_black.svg?alt=media&token=fb8128d0-c4a4-40ac-9c54-4d034d9f2844'} height={25} width={25} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {
                (userCarts.length > 0) &&
                <div className="w-[90vw] lg:w-[45vw] bg-black border-2 border-csGreen rounded rounded-lg py-2 px-4">
                    <span className='block text-right text-[1.4rem]'>Total: <b>$ {total}</b></span>
                </div>
            }

            {
                (userCarts.length > 0) &&
                <div className="w-[90vw] lg:w-[45vw] flex justify-between bg-black border-2 border-csGreen rounded rounded-lg py-2 px-4">
                    <input type="text" className="bg-white text-black text-[1rem] rounded-lg w-[65%] py-2 px-4" placeholder="discount code/gift card" />
                    <button className="green_button w-[25%]" type="button"> Apply </button>
                </div>
            }

            <div className="w-[90vw] lg:w-[45vw] flex justify-center gap-1 bg-black border-2 border-csGreen rounded rounded-lg py-2 px-4">
                {
                    (userCarts.length > 0) &&
                    <button id="btn_proceedPay" onClick={() => {handleProceedPay()}} className="green_button w-[33%]" type="button" >
                        Place order
                    </button>
                }
                <Link to={'/products'} className="green_button w-[33%] text-center">
                    Go shopping!
                </Link>
                {
                    (userCarts.length > 0) &&
                    <button id="btn_clearCart" onClick={() => {handleClearCart()}} className="green_button w-[33%]" type="button" >
                        <b>Clear cart</b>
                    </button>                
                }
            </div>
        </div>
    )
}

export default Cart