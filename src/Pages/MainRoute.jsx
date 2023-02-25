import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
function MainRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
        </Routes>
    </div>
  )
}

export default MainRoute