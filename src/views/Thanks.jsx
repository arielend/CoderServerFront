import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import axios from 'axios'

import Loader from '../components/Loader/Loader.jsx'
import { Link } from 'react-router-dom'

const Thanks = () => {

    const location = useLocation()
    const navigate = useNavigate()
    
    const [ session_id, setSession_id ] = useState(undefined)
    const [ isLoading, setIsLoading ] = useState(false)
    
    const ClearCart = async () => {
        setIsLoading(true)
        try {
            const url = 'https://coderserver-1cn9.onrender.com/api/clearCarts/clear'
            await axios.delete(url, { withCredentials: true })            
        } catch (error) {
            console.error('Failed to clear the cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const SaveOrder = async (session_id) => {
        try {
            const url = 'https://coderserver-1cn9.onrender.com/api/orders'
            const data = { session_id }
            await axios.post(url, data, {withCredentials: true})
        } catch (error) {
            console.error('Failed to save the order:', error)
            
        }
    }

    const ViewOrderDetails = async () => {
        try {
            const url = `https://coderserver-1cn9.onrender.com/api/payment/${session_id}`
            const order = await axios.get(url, {withCredentials: true})
            console.log('order.data', order.data)

            if(order.data.response){
                Swal.fire({
                    title: '<h6 class="text-orange"> Order details </h6>',
                    html: `
                        <p>Payment status: <b> ${order.data.response.payment_status} </b> </p>
                        <p>Total: <b> ${order.data.response.currency} ${order.data.response.amount_total / 100} </b> </p>
                        <p>User email: <b> ${order.data.response.customer_details.email} </b> </p>
                    `,
                    showCloseButton: false,
                })
            }
        } catch (error) {
            console.error('Failed to retrieve order details:', error)
        }
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const sessionId = query.get('session_id')
        if(sessionId){
            ClearCart()
            SaveOrder(sessionId)        
            setSession_id(sessionId)
        }
        else{
            navigate('/products')
        }
    }, [location.search, navigate])

    if(isLoading){
        return(<Loader/>)
    }

    return (
        <div className="h-[60vh] flex flex-col justify-center items-center">
            <div className="bg-white flex flex-col gap-4 rounded-2xl shadow-2xl text-black p-4 w-[95%] md:w-[75%] lg:w-[55%]">
                {
                    session_id && 
                    <h4>Order placed successfully!</h4>
                }
                <h2 className="w-full text-center">Thank you for shopping!</h2>
                <Link to={'/products'} className="green_button text-center m-auto">
                    Continue shopping!
                </Link>
                {
                    session_id && 
                    <button id="btn_login"
                        type="button"
                        className="green_button m-auto"
                        onClick={ViewOrderDetails} >
                        View order details
                    </button>
                }
                {
                    session_id &&
                    <span className='text-orange text-[.7rem] text-right'> Order ID: {session_id} </span>
                }
            </div>
        </div>
    )
}

export default Thanks