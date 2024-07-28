import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import ItemCount from '../components/ItemCount.jsx'
import Loader from '../components/Loader/Loader.jsx'

const ProductDetail = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ user, setUser ] = useState({})
    const [product, setProduct] = useState({})
    const [ greenStars, setGreenStars ] = useState(0)
    const [ greyStars, setGreyStars ] = useState(0)
    const { id } = useParams()    
    const maxRating = 5
    const navigate = useNavigate()

    useEffect(() => {
        const url = `http://localhost:9000/api/products/${id}`
        const userCookie = Cookies.get('user')
        
        if(userCookie){
            const parsedUser = JSON.parse(userCookie)
            setUser(parsedUser)
        }
        
        axios(url)
        .then((result) => {
            if(result.data.statusCode != 404){
                setProduct(result.data.response)
                setGreenStars(result.data.response.rating)
                setGreyStars(maxRating - (result.data.response.rating))
            }
        })
        .catch((error) => console.log(error))
        
        setIsLoading(false)

    }, [isLoading])

    const OnAddHandler = async (quantity) => {

        const data = {
            product_id: id,
            product_quantity: quantity
        }

        const url = 'http://localhost:9000/api/products'
        const response = await axios.post(url, data, {withCredentials: true})


        //TODO: Seguir desde aca
        console.log('Response de add to cart', response)
        console.log('El user en add to cart', user)
        
        if(response?.data.statusCode === 200) {

            setTimeout(()=>{            
                navigate('/carts')            
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

    return (
        <div className="flex flex-col justify-start gap-6 items-center">
            {isLoading && <Loader/>}
            <h2 className="w-[30vw] bg-black text-center pb-1.5 text-csGreen font-bold rounded rounded-xl"> Product Detail </h2>

            {
                (Object.keys(product).length !== 0) ? 
                <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-2xl text-black p-4">
                    <div className='flex justify-center items-center'>
                        <img className="min-w-[500px] min-h-[500px] max-h-[100%]" src={product.photo} alt={`${product.title} photo`} />
                    </div>
                    <div className="max-h-[300px]flex flex-col justify-start gap-4 items-center-5">
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
                                Price: U$S {product.price}
                            </span>
                            <button className="green_button" onClick={()=>{navigate('/products')}}>Go back!</button>
                        </div>

                        {
                            (user.online == true) &&
                            <div className='flex justify-center items-center'>
                                <ItemCount onAdd={OnAddHandler}/>
                            </div>
                        }

                    </div>
                </div>
                :
                <div className='min-h-[50vh]'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2FnotFoundProduct.svg?alt=media&token=3a6af282-1a85-4d7f-836d-7367201719d9" className='h-[350px]'/>
                </div>
            }

            
        </div>
    )
}

export default ProductDetail
