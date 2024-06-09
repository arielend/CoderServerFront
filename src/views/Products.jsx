import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductItem from '../components/ProductItem.jsx'

const Products = () => {

    const [ products, setProducts ] = useState([])

    useEffect(()=>{
        axios("http://localhost:8080/api/products")
        .then(result => setProducts(result.data.response))
        .catch(error => console.log(error))
    },[])

    return(
        <>
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold mx-auto">Products</h2>        
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
        </>
    )
}

export default Products