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
    const [product, setProduct] = useState({})
    const [ greenStars, setGreenStars ] = useState(0)
    const [ greyStars, setGreyStars ] = useState(0)
    const { id } = useParams()
    const user = Cookies.get('user')
    const maxRating = 5
    const user_id = 'numero hex' //Obtener de la cookie user
    const navigate = useNavigate()

    useEffect(() => {
        const url = `http://localhost:9000/api/products/${id}`
        const productRating = 4
        
        setGreenStars(productRating)
        setGreyStars(maxRating - productRating)
        
        //Para simular una demora en la carga de 0.7 segundos
        setTimeout(()=>{
            setIsLoading(false)
        }, 700)

        axios(url)
        .then((result) => setProduct(result.data.response))
        .catch((error) => console.log(error))

    }, [isLoading])

    useEffect(()=>{
    },[])
    
    const OnAddHandler = async (quantity) => {

        console.log('En el add to cart');

        const data = {
            user_id,
            product_id: id,
            product_quantity: quantity
        }

        const url = 'http://localhost:9000/api/products'
        const response = await axios.post(url, data, {withCredentials: true})


        //TODO: Seguir desde aca
        console.log('Response de add to cart', response);

        console.log('El user en add to cart', user);
        
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

    console.log('El product', product)

    return (
        <div className="flex flex-col justify-start gap-6 items-center">
            {isLoading && <Loader/>}
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold"> Product Detail </h2>

            <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-2xl text-black p-4 w-[50%]">
                <div className='max-h-[300px] flex justify-center items-center'>
                    <img className="max-h-[90%]" src={product.photo} alt={`${product.title} photo`} />
                </div>
                <div className="max-h-[300px]flex flex-col justify-start gap-4 items-center-5">
                    <h3 className="text-black">{product.title}</h3>
                    
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

                    <div className='flex justify-center items-center'>
                        <ItemCount onAdd={OnAddHandler}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
