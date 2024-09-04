import { useState } from 'react'
import Loader from '../components/Loader/Loader'

const Checkout = () => {

    const [ isLoading, setIsloading ] = useState(false)

    return (
        <div className="flex flex-col justify-start w-[100] gap-6 items-center">
            {isLoading && <Loader />}
            <h2 className="w-[30vw] bg-black text-center pb-1.5 text-csGreen font-bold rounded rounded-xl">
                Payment
            </h2>
            <div className='flex flex-col lg:flex-row justify-between lg:justify-start w-full gap-2'>
                {/* CART SUMMARY */}
                <div className='flex flex-col justify-start items-center w-[100%] lg:w-[40%] p-4 bg-white border-2 border-black rounded rounded-lg'>
                    <h4 className='font-bold text-black mb-2'>Tus porquerias</h4>
                    <table className='w-full'>
                        <thead className='bg-csGreen'>
                            <tr>
                                <th className='w-[60%] border border-1 border-black'>
                                    <td className='text-black px-2 py-1'>Title</td>
                                </th>
                                <th className='w-[10%] border border-1 border-black'>
                                    <td className='text-black px-2 py-1'>Price</td>
                                </th>
                                <th className='w-[10%] border border-1 border-black'>
                                    <td className='text-black px-2 py-1'>Quantity</td>
                                </th>
                                <th className='w-[10%] border border-1 border-black'>
                                    <td className='text-black px-2 py-1'>Subtotal</td>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td  className='w-[60%] border border-1 border-black text-black pl-2 py-1'> 
                                    1
                                </td>
                                <td className='w-[10%] border border-1 border-black text-black text-center py-1'>
                                    1
                                </td>
                                <td className='w-[10%] border border-1 border-black text-black text-center py-1'>
                                    1
                                </td>
                                <td className='w-[10%] border border-1 border-black text-black text-center py-1'>
                                    1
                                </td>
                            </tr>                             
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className='text-center text-black font-bold'> Total USD</td>
                                <td className='border border-1 border-black text-center text-black font-bold py-1'>1000</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>

                {/* PAY METHOD */}
                <div className="flex justify-center items-center w-[100%] lg:w-[40%] m-auto p-4 bg-white border-2 border-black rounded rounded-lg">
                    <form className="flex flex-col gap-2 m-auto w-full">
                        <div className='p-1'>
                            <label className='flex flex-col' >
                                <span className='font-bold text-black mb-2'>Payment method:</span>
                                <div className="flex items-center mb-2">
                                    <input defaultChecked id="RB_CreditCard" type="radio" value="" name="pay-method" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="RB_CreditCard" className="ms-2 text-sm font-medium text-black">Credit card</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="RB_PayPal" type="radio" value="" name="pay-method" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" disabled/>
                                    <label htmlFor="RB_PayPal" className="ms-2 text-sm font-medium text-black">PayPal</label>
                                </div>                        
                            </label>
                        </div>
                        <div className='p-1'>
                            <label className='flex flex-col' >
                                <span className='font-bold text-black mb-2'>Name:</span>
                                <input type='text' className='w-full border-2 border-black rounded rounded-md py-2 px-3 bg-white placeholder-grey-100 text-black' placeholder='Enter your name exactly as it appears on your credit card'></input>
                            </label>
                        </div>
                        <div className='p-1'>
                            <label className='relative flex flex-col' >
                                <span className='font-bold text-black mb-2'>Card number:</span>
                                <input className="w-full rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-grey-300 bg-white text-black" type="text" name="card_number" placeholder="0000 0000 0000" />
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0  003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </label>
                        </div>

                        <div className='flex justify-between'>
                            <div className='p-1 w-[50%]'>
                                <label className='relative flex flex-col' >
                                    <span className='font-bold text-black mb-2'>Expire date:</span>
                                    <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 bg-white text-black" type="text" name="expire_date" placeholder="MM/YY" />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black  peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin='round' strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </label>
                            </div>

                            <div className='p-1 w-[50%]'>
                                <label className='relative flex flex-col' >
                                <span className="font-bold flex items-center gap-3 mb-2 text-black"> CVC/CVV 
                                <span className="relative group">
                                    <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white"> The last 3 digits on the back of your card </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </span>
                            <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 bg-white text-black" type="text" name="card_cvc" placeholder="&bull;&bull;&bull;" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <button className='green_button'>Proceed to pay</button>
                        </div>                    
                    </form>                
                </div>
            </div>

        </div>
    )
}

export default Checkout
