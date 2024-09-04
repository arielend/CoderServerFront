import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import UseAxios from '../hooks/useAxios.js'

import Loader from '../components/Loader/Loader'
import useAxios from '../hooks/useAxios.js'

const CreateProduct = () => {

    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ product, setProduct ] = useState({
        title: '', 
        category: '',
        photo: '', 
        description: '', 
        rating: 5, 
        price: 1, 
        stock: 1
    })
    
    const HandleCHange = (e) => {
        const { name, value } = e.target

        setProduct(prevProduct => ({
            ...prevProduct, [name]:value
        }))
    }

    const SubmitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if(ProductCreateValidation(product)){
            
            const url = 'https://coderserver-1cn9.onrender.com/api/products'
            const response = await axios.post(url, product, { withCredentials: true})

            if(response?.data.statusCode == 201){                
                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Product created!',
                    text: "Product has been succesfuly created!",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'View products!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/products/${response.data.response._id}`)
                    }
                })
            }
        }
    }

    const ProductCreateValidation = (product) => {
        let validates = true
        let validationMessage = ``
        product.category == '' && (validationMessage += `You have to select a <b style="color: orange">Category</b>. </br>`)
        product.title == '' && (validationMessage += `<b style="color: orange">Title</b> field is required. </br> `)

        if(validationMessage != ''){
            Swal.fire({
                icon: 'error',
                title: 'Validation error',
                html: validationMessage,
            })
            setIsLoading(false)            
            validates = false            
        }
        return validates
    }
    
    return (        
        <div className="flex flex-col justify-start w-[100] gap-6 items-center">
            {isLoading && <Loader />}
            <h2 className="w-[30vw] bg-black text-center pb-1.5 text-csGreen font-bold rounded rounded-xl">
                Nuevo producto
            </h2>

            <div className="flex text-black">
                <div className="w-75">                    
                    <form className="flex flex-col bg-white p-4 m-auto align-center border border-secondary rounded rounded-xl" 
                    onSubmit={SubmitHandler}>
                        <div className="form-group w-70 my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category" >
                                Category (*)
                            </label>
                            <select
                                className="block appearance-none w-full bg-gray-600 border border-gray-200 text-csGreen py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:text-black"
                                id="category" name='category' value={product.category} onChange={HandleCHange} >
                                <option value="">Select category...</option>    
                                <option className='text-black' value="graphics_cards">Graphics Cards</option>
                                <option className='text-black' value="keyboards">Keyboards</option>
                                <option className='text-black' value="mice">Mice</option>
                                <option className='text-black' value="motherboards">Motherboards</option>
                                <option className='text-black' value="processors">Processors</option>
                                <option className='text-black' value="ram_memory">Ram memory</option>
                                <option className='text-black' value="storage_drives">Storage Drives</option>
                            </select>
                        </div>

                        <div className="form-group w-70 my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title" >
                                Title (*)
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-csGreen leading-tight focus:outline-none focus:shadow-outline" id="title" name='title' type="text" placeholder="Product title" value={product.title} onChange={HandleCHange} />
                        </div>

                        <div className="form-group w-70 my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description" >
                                Description
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-csGreen leading-tight focus:outline-none focus:shadow-outline" id="description" name='description' type="text" placeholder="Product description" value={product.description} onChange={HandleCHange}/>
                        </div>

                        <div className="form-group w-70 my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo" >
                                Photo url
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-csGreen leading-tight focus:outline-none focus:shadow-outline" id="photo" name='photo' type="text" placeholder="Paste the product photo url" value={product.photo} onChange={HandleCHange}/>
                        </div>

                        <div className='flex gap-1'>
                            <div className="form-group w-30 my-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price" >
                                    Price in USD
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-csGreen leading-tight focus:outline-none focus:shadow-outline" id="price" name='price' type="number" min={0} placeholder="Price in U$D" value={product.price} onChange={HandleCHange}/>
                            </div>                        

                            <div className="form-group w-30 my-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock" >
                                    Stock
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-csGreen leading-tight focus:outline-none focus:shadow-outline" id="stock" name='stock' min={1} type="number" placeholder="Product stock" value={product.stock} onChange={HandleCHange}/>
                            </div>

                            <div className="form-group w-30 my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating" >
                                    Rating
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-csGreen leading-tight focus:outline-none focus:shadow-outline" id="rating" name='rating' type="number" min={1} max={5} placeholder="Set product initial rating" value={product.rating} onChange={HandleCHange}/>
                            </div>
                        </div>

                        <span>(*) Required fields</span>

                        <div className='flex justify-center'>
                            <button type='submit' className='green_button'>Create product</button>                                
                        </div>
                    </form>
                </div>
            </div>
        </div>       
    )
}

export default CreateProduct