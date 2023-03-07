import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Cart from './Cart'
import Home from './Home'
import Signle from './Signle'
import Singup from './Singup'
function MainRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/singup' element={<Singup/>}></Route>
            <Route path='/singlepage/:id' element={<Signle/>} ></Route>
        </Routes>
    </div>
  )
}

export default MainRoute