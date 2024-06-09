import axios from 'axios'
import { useState, useEffect } from 'react'
import Item from './Item.jsx'

const Content = () => {

    const [ products, setProducts ] = useState([])

    useEffect(()=>{
        axios("http://localhost:8080/api/products")
        .then(result => setProducts(result.data.response))
        .catch(error => console.log(error))
    },[])

    return(
        <section className='flex flex-wrap justify-center bg-[url("/images/Site_BG1.webp")] bg-contain bg-fixed'>
            {
                products && products.length > 0 ? (
                    products.map((each, index) => (
                        <Item key={index} {...each} />
                    ))
                ) : (
                    <p>No hay productos disponibles</p>
                )
            }
        </section>
    )
}

export default Content