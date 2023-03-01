import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
import Singup from './Singup'
function MainRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/singup' element={<Singup/>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoute