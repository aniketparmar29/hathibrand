import React from 'react';

import logo from '../assets/logo.png';

function Navbar() {

  return (
    <div>
      <nav className='flex justify-around p-4 navbar'>
        <div className=''>
          <img className='w-14 h-12 ' src={logo} alt='logo' />
        </div>
        <ul className='flex gap-x-4'>
          <li>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>Contact</li>
          <li>
           
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
