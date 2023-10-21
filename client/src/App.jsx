import Landing from './components/Landing/Landing';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home/Home';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
