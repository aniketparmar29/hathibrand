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
            <Route path='*' element={<PageNotFound/>}></Route>
            <Route path='/about' element={<AboutUs/>}></Route>
            <Route path='/contact' element={<ContactUs/>}></Route>
            <Route path='/website' element={<MoreWebsite/>}></Route>
            {/* <Route path="/admin/products" element={<Products/>}></Route> */}
            <Route path="/admin/users" element={<Users/>}></Route>
            <Route path="/admin/sliders" element={<Sliders/>}></Route>
            <Route path="/admin/reviews" element={<Reviews/>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoute