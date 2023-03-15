import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Cart from './Cart'
import Home from './Home'
import Signle from './Signle'
import PageNotFound from './PageNotFound'
import Singup from './Singup'
// import Admin from '../admin/Admin'
import Login from './Login'
import ProudctPage from './ProudctPage'
// import Dashboard from '../../../Admin/Dashboard'
function MainRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/singup' element={<Singup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path='/singlepage/:id' element={<Signle/>} ></Route>
            <Route path='products/singlepage/:id' element={<Signle/>} ></Route>
            {/* <Route path='/admin' element={<Dashboard/>}></Route> */}
            <Route path='/products' element={<ProudctPage/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoute