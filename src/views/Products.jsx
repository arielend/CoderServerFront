// import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductItem from '../components/ProductItem.jsx'
import Loader from '../components/Loader/Loader.jsx'
import useAxios from '../hooks/useAxios.js'

const Products = () => {

    const [ products, setProducts ] = useState([])
    const [ page, setPage ] = useState(1)
    const [ prevPage, setPrevPage ] = useState(null)
    const [ nextPage, setNextPage ] = useState(null)
    const [ limit, setLimit ] = useState(10)
    const [ filter, setFilter ] = useState({})

    const { data, loading, error, refetch } = useAxios({
        url: 'http://localhost:9000/api/products',
        method: 'get',
        immediate: true,
        filter: filter,
        queries:[
            { key: 'page', value: page},
            { key: 'limit', value: limit},
            { key: 'prevPage', value: prevPage},
            { key: 'nextPage', value: nextPage},
        ]
    })

    useEffect(()=>{
        if(data){
            setNextPage(data.response.nextPage)
            setPrevPage(data.response.prevPage)
            setProducts(data.response.docs)
        }
    },[
        data, loading, error
    ])

    const PrevClickHandler = () => {
        if(prevPage){
            setPage(page - 1)
            refetch()
        }
    }

    const NextClickHandler = () => {
        if(nextPage){
            setPage(page + 1)
            refetch()
        }
    }

    return(
        <>
            { loading && <Loader/> }
            <h2 className="w-[30vw] bg-csGreen text-center text-black font-bold mx-auto">Products</h2>
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
                <section className='flex justify-center items-center gap-2'>
                    <button className='green_button' onClick={PrevClickHandler}>Prev</button>
                    <span className='text-black font-bolder px-12 py-1.5 mx-4 bg-csGreen border rounded rounded-lg'>{page}</span>
                    <button className='green_button' onClick={NextClickHandler}>Next</button>
                </section>
            </div>
        </>
    )
}

export default Products