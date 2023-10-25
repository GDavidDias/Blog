import Landing from './components/Landing/Landing';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home/Home';
import { useDispatch } from 'react-redux';
import { setAllPosts } from './redux/postSlice';
import { useEffect } from 'react';
import axios from 'axios';
import {URL} from '../varGlobal.js';

function App() {
  const dispatch = useDispatch();

  const getAllPost = async() =>{
    try{
      const {data} = await axios.get(`${URL}/api/setDefaultPosts`);
      console.log('que trae data: ', data);
      dispatch(setAllPosts(data))
    }catch(error){
      console.log('error en getAllPost: ', error)
    }
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
