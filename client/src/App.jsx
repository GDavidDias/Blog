import Landing from './components/Landing/Landing';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home/Home';
import dataJson from './data/data.json';
import { useDispatch } from 'react-redux';
import { setAllPosts } from './redux/postSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const getAllPost = () =>{
    dispatch(setAllPosts(dataJson))
  };

  useEffect(()=>{
    getAllPost();
  },[])

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
