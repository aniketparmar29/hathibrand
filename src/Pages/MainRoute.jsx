import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Cart from './Cart'
import Home from './Home'
import Signle from './Signle'
import PageNotFound from './PageNotFound'
import Singup from './Singup'
import Login from './Login'
import ProudctPage from './ProudctPage'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import MoreWebsite from './MoreWebsite'
import Dashboard from '../Admin/Dashboard'
import Products from '../Admin/Products'
import Users from '../Admin/Users'
import Sliders from '../Admin/Sliders'
import Reviews from '../Admin/Reviews'
import Checkout from './Checkout'
import AdminCoupan from '../Admin/AdminCoupan'
import CustomerSupp from './CustomerSupp'
import Termsofserice from './Termsofserice'
import Privacypolicy from './privacypolicy'
import RefundPolicy from './RefundPolicy'
function MainRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/singup' element={<Singup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path='/singlepage/:id' element={<Signle/>} ></Route>
            <Route path='products/singlepage/:id' element={<Signle/>} ></Route>
            <Route path='/admin' element={<Dashboard/>}></Route>
            <Route path='/products' element={<ProudctPage/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
            <Route path='/about' element={<AboutUs/>}></Route>
            <Route path='/contact' element={<ContactUs/>}></Route>
            <Route path='/website' element={<MoreWebsite/>}></Route>
            <Route path="/admin/products" element={<Products/>}></Route>
            <Route path="/admin/users" element={<Users/>}></Route>
            <Route path="/admin/sliders" element={<Sliders/>}></Route>
            <Route path="/admin/reviews" element={<Reviews/>}></Route>
            <Route path="/admin/coupan" element={<AdminCoupan/>}></Route>
            <Route path="/support" element={<CustomerSupp/>}></Route>
            <Route path="/terms-of-service" element={<Termsofserice/>}></Route>
            <Route path="/privacy-policy" element={<Privacypolicy/>}></Route>
            <Route path="/cancellation" element={<RefundPolicy/>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoute