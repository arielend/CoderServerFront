import { Outlet } from 'react-router'
import Loader from './Loader/Loader'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return(
        <>        
        <Header/>
        <main className='flex flex-col p-6 bg-[url("https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/bg%2FSite_BG1.webp?alt=media&token=5e48a0a6-98a2-4ddb-89dc-6d29711fe109")] bg-contain bg-fixed'>
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default Layout