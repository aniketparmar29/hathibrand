import React from 'react'
import Navbar from '../Components/Navbar'
import useDarkMode from '../hooks/useDarkMode';
function Home() {
  const [isDarkMode,toggleDarkMode] = useDarkMode();
  return (
    <div className={`${isDarkMode ? 'darkmode' : 'lightmode'}`}>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
        <h1 className='text-4xl'>hathibrand</h1>
    </div>
  )
}

export default Home