import React from 'react'
import NewProduct from './NewProduct'
import ProductList from './ProductList'
import SideBar from "./components/Sidebar";
function Products() {
  return (
    <div>
      <div>
         <SideBar title="Products" />
        </div>
        <NewProduct/>
        <ProductList/>
    </div>
  )
}

export default Products