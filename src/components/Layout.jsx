import { Outlet } from 'react-router'

import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return(
        <>
        <Header/>
        <main className='flex flex-col p-6 bg-[url("/images/Site_BG1.webp")] bg-contain bg-fixed'>
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default Layout