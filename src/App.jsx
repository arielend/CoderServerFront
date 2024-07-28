import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout.jsx'
import Products from './views/Products.jsx'
import Home from './views/Home.jsx'
import Cart from './views/Cart.jsx'
import Chat from './views/Chat.jsx'
import ProductDetail from './views/ProductDetail.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import PasswordReset from './views/PasswordReset.jsx'
import PasswordSetNew from './views/PasswordSetNew.jsx'
import User from './views/User.jsx'
import Google from './views/Google.jsx'
import Verify from './views/Verify.jsx'
import Page404 from './views/Page404.jsx'


function App() {
	return (
        <>        
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/password' element={<PasswordReset />} />
                <Route path='/setNew' element={<PasswordSetNew />} />
                <Route path='/verify' element={<Verify/>}/>
                <Route path='/404' element={<Page404/>} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='products' element={<Products />} />
                    <Route path='products/:id' element={<ProductDetail />} />
                    <Route path='chat' element={<Chat />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='profile' element={<User />} />
                    <Route path='google' element={<Google/>}/>
                </Route>
            </Routes>
        </Router>
        </>
    )
}

export default App
