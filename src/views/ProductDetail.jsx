import axios from 'axios'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'

const ProductDetail = () => {

    const [ product, setProduct ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const { id } = useParams()
    
    useEffect(()=>{
        const url = `http://localhost:9000/api/products/${id}`
        axios(url)
        .then((result) => {
            setProduct(result.data.response)
            setIsLoading(false)
        })
        .catch(error => console.log(error))
    },[isLoading])

    console.log('El product', product)

    return(
        <div className="flex justify-center items-start h-[70vh]">
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold">Product Detail</h2>
            <h4 className='text-button text-white'>{product.title}</h4>
            <h6 className='text-button text-white'>U$S {product.price}</h6>
            <h6 className='text-button text-white'>{product.stock}</h6>
            <img src={product.photo}></img>
        </div>
    )
}

export default ProductDetail