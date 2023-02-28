import React from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import logo from '../assets/logo.png';

function Navbar({ isDarkMode, toggleDarkMode }) {

  return (
    <div className={`${isDarkMode === true ? 'darkmode' : 'lightmode'}`}>
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
            <button className='toglebtn' onClick={toggleDarkMode}>
              {isDarkMode && <BsFillSunFill className='text-yellow-600'/>}
              {!isDarkMode && <BsFillMoonStarsFill />}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
