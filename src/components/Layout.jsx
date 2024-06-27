import { Outlet } from 'react-router'

import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return(
        <>
        <Header/>
        <main className='flex flex-col p-6 bg-[url("https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/bg%2FSite_BG.webp?alt=media&token=7ac589cc-94df-4ee6-b1ff-814d81296ff0")] bg-contain bg-fixed'>
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default Layout