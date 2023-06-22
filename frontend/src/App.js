import './App.css';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Netflix from './pages/Netflix';
import Player from './pages/Player';
import Movies from './pages/Movies';
import Tv from './pages/Tv';
import Mylist from './pages/Mylist';
import Search from './pages/Search';


function App() {
  return (
   <Router>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<Netflix />} />
      <Route path='/player' element={<Player />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/tv' element={<Tv />} />
      <Route path='/mylist' element={<Mylist />} />
      <Route path='/search' element={<Search />} />
    </Routes>
   </Router>
  );
}

export default App;
