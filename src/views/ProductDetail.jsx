import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

import Loader from '../components/Loader/Loader.jsx'
import { Link } from 'react-router-dom'

const ProductDetail = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ user, setUser ] = useState({})
    const [ product, setProduct ] = useState(null)
    const [ stock, setStock ] = useState(1)
    const [ quantity, setQuantity ] = useState(0)
    const [ greenStars, setGreenStars ] = useState(0)
    const [ greyStars, setGreyStars ] = useState(0)
    const { id } = useParams()    
    const maxRating = 5
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const url = `https://coderserver-1cn9.onrender.com/api/products/${id}`
            const userCookie = Cookies.get('user')        
            
            if(userCookie){
                const parsedUser = JSON.parse(userCookie)
                setUser(parsedUser)
            }

            try {
                const result = await axios.get(url)
                if(result.data.statusCode != 404){
                    setProduct(result.data.response)                
                    setStock(result.data.response.stock)
                    setGreenStars(result.data.response.rating)
                    setGreyStars(maxRating - (result.data.response.rating))                    
                }
            } catch (error) {
                setProduct(null)
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()

    }, [id])

    useEffect(()=>{
        if(quantity > 0) {
            OnAddHandler(quantity)
        }
    },[quantity])

    const SelectQuantity = () => {
        Swal.fire({
            title: 'Select quantity',
            icon: 'info',
            input: 'number',
            inputAttributes: {
                min: 1,
                max: stock,
            },
            confirmButtonColor: '#ff3b3c',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: true,
            showConfirmButton: true,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need set a quantity!'
                }
                if(value && value > stock){
                    return 'Oop, our stock is not that much!'
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {                
                setQuantity(result.value)
            }
        })
    }

    const OnAddHandler = async (quantity) => {        
        const data = {
            product_id: product._id,
            product_quantity: quantity
        }

        const url = 'https://coderserver-1cn9.onrender.com/api/carts'
        const response = await axios.post(url, data, {withCredentials: true})

        if(response?.data.statusCode === 201) {

            setTimeout(()=>{            
                navigate('/cart')            
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
    }

    if(isLoading) {
        return(<Loader/>)
    }

    if(product === null){
        return(
            <div className='min-h-[65vh] w-full flex flex-col gap-2 justify-center'>
                <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2FnotFoundProduct.svg?alt=media&token=3a6af282-1a85-4d7f-836d-7367201719d9" className='h-[350px]'/>
                <Link to={'/products'} className='green_button mx-auto'>Go back!</Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-start gap-6 items-center">
            <h2 className="w-[30vw] bg-black text-center pb-1.5 text-csGreen font-bold rounded rounded-xl"> Product Detail </h2>            
            <div className="bg-white flex flex-col flex-wrap md:flex-row rounded-2xl shadow-2xl text-black p-4 w-[95%] md:w-[75%] lg:w-[55%]">
                <div className='flex justify-center items-center w-full md:w-[50%]'>
                    <img className="aspect-square" width={"500px"} height={"500px"} src={product.photo} alt={`${product.title} photo`} />
                </div>
                <div className="w-full md:w-[50%] max-h-[300px]flex flex-col justify-start gap-4 items-center-5">
                    <h3 className="text-black text-center">{product.title}</h3>

                    <span className='w-[50%]'>{product.description}</span>
                    
                    <div className="flex justify-center items-center gap-1">

                        {/* Renderiza el rating */}
                        {Array.from({ length: greenStars }).map((_, index) => (
                            <img key={index}
                                className="h-5 w-5 text-yellow-300"
                                src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Frating_star_icon.svg?alt=media&token=2ef6ef89-9aff-46ae-9d3e-75aefa58401b"
                                alt="Star icon"
                            />                            
                        ))}

                        {Array.from({ length: greyStars }).map((_, index) => (
                            <img key={index}
                            className="h-5 w-5 text-yellow-300"
                            src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Frating_star_icon_grey.svg?alt=media&token=147bc80b-9964-4add-8f3d-7c8dfddd4ebc"
                            alt="Star icon"
                            />                        
                        ))}                        
                        
                        <span className="ml-2 rounded bg-csGreen px-2.5 py-0.5 font-bold">
                            {greenStars}/{maxRating}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-4">
                        <span className="font-bold text-orange text-[1.4rem]">
                            Price: USD {product.price}
                        </span>
                    </div>                        

                    {
                        //Es usuario premium y proveedor del producto
                        (user.role == 'prem' && (user._id == product.supplier_id?._id.toString())) &&
                        <div className='flex justify-center gap-1 my-1'>
                            <button className="green_button w-[30%]" onClick={()=>{navigate('/products/me')}}>Go back!</button>
                            <button className="green_button w-[30%]" onClick={()=>{navigate('/products')}}>Edit</button>
                        </div>
                    }

                    {
                        //Es usuario premium pero no es proveedor del producto
                        (user.role == 'customer' || user.role == 'prem' && (user._id != product.supplier_id?._id.toString())) &&
                        <div className='flex justify-center gap-1 my-1'>
                            <button className="green_button w-[30%]" onClick={()=>{navigate('/products')}}>Go back!</button>
                            <button className="green_button w-[30%]" onClick={SelectQuantity}>Add to cart</button>
                        </div>
                    }

                    {
                        //Es usuario administrador
                        user.role == 'admin' &&
                        <div className='flex justify-center gap-1 my-1'>
                            <button className='green_button w-[30%]'>Edit</button>
                            <button className="green_button w-[30%]" onClick={()=>{navigate('/products/me')}}>See Store products!</button>
                            <button className="green_button w-[30%]" onClick={()=>{navigate('/products')}}>See all products!</button>
                        </div>
                    }

                    {
                        Object.keys(user).length == 0 &&
                        <div className='flex justify-center gap-1 my-1'>                                
                            <button className="green_button w-[30%]" onClick={()=>{navigate('/products')}}>Go back!</button>
                        </div>
                    }
                </div>
            </div>                           
        </div>
    )
}

export default ProductDetail