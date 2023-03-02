import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
import PageNotFound from './PageNotFound'
import Singup from './Singup'
function MainRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/singup' element={<Singup/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoute