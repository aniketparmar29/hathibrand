import './App.css';
import MainRoute from './Pages/MainRoute';
import Navbar from './Components/Navbar';
import useReady from "./useReady";
import Spinner from './Components/Spinner';

function App() {
  const {ready} = useReady(3800);

  return (

    <div className="App">
       {ready!==true &&
        <div className="fixed z-50 inset-0 bg-gray-500 opacity-75 flex items-center justify-center">
          <Spinner />
        </div>}
      <MainRoute/>
      
    </div>
  );
}

export default App;
