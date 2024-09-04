import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductItem from '../components/ProductItem.jsx'
import Loader from '../components/Loader/Loader.jsx'

const MyProducts = () => {

    const [ products, setProducts ] = useState([])    
    const [ loading, setLoading ] = useState (false)
    const [ error, setError ] = useState(null)

    useEffect(()=>{
        const url = 'https://coderserver-1cn9.onrender.com/api/products/me'
        axios.get(url,{withCredentials:true})        
        .then((response) => {
            console.log('El response.data como llega a myProducts.jsx: ', response.data)
            setLoading(false)            
            setProducts(response.data.response)
        })
        .catch(error => {
            console.log(error)
            setError(error)
        })
    },[])    

    return(
        <>
            { loading && <Loader/> }
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold mx-auto">My Products</h2>
            <div className='flex flex-col justify-center items-center'>
                <section className='flex flex-wrap justify-center'>
                    {
                        products && products.length > 0 ? (
                            products.map((each, index) => (
                                <ProductItem key={index} {...each} />
                            ))
                        ) : (
                            <p>There is no products to list.</p>
                        )
                    }
                </section>                
            </div>
        </>
    )
}

export default MyProducts