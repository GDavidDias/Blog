import style from './NavBar.module.css';
import {FaSearch} from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/pageSlice";

import { useEffect, useRef, useState } from "react";
import { setFilterPosts } from '../../redux/postSlice';

const dataCategories = ["Cultura","Deportes","Sociedad","Comidas","Argentina"];

const NavBar = () => {
    const dispatch = useDispatch();

    const[open, setOpen] = useState(false);
    const postSG = useSelector((state)=>state.posts.posts);
    const[input,setInput]=useState('');
    
    const handleInput = (event) => {
        const {value} = event.target;
        setInput(value);
    };


    const handleBlogueros = () =>{
        dispatch(setPage('InitBlog'))
    };

    const handleCategory = (category) => {
        console.log('que tiene menu: ', category);
        //dispatch(setFilterPosts(category));
        let filterPosts = []
        postSG.forEach((post)=>{
            console.log('que tiene post: ', post);
            console.log('que tiene post.Category: ', post.Category)
            if(post.Category.includes(category)){
                filterPosts.push(post);
            }
        });
        console.log('que se filtro: ', filterPosts)
        if(filterPosts.length!==0){
            dispatch(setFilterPosts(filterPosts));
        }
    };

    const handleCategoryAll = () => {
        dispatch(setFilterPosts(postSG));
        console.log('que se filtro: ', postSG)
    };

    useEffect(()=>{
        console.log('que valor tiene open: ', open)
    },[open])

    useEffect(()=>{
        console.log('que tiene input: ', input)
    },[input])

    useEffect(()=>{
        setOpen(false);
    },[]);

    let menuRef = useRef();

    useEffect(()=>{
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }
        };
        document.addEventListener('mousedown',handler);

        return()=>{document.removeEventListener('mousedown',handler)}
    });    

    return(
        <div className="w-full h-[10vh] border-2 bg-slate-100 flex flex-row justify-center items-center space-x-14">
            <div>
                <h1 className="hover:text-blue-500 cursor-pointer "
                    onClick={()=>handleBlogueros()}
                >Blogueros</h1>
            </div>
            <div className='flex flex-row items-center'>
                <input
                    className='w-64 h-8 p-2 border-2'
                    placeholder='buscar titulo post...'
                    onChange={handleInput}
                    value={input}
                />
                <button
                    className='text-lg border-2 bg-white'
                    onClick={()=>setInput('')}
                >X</button>
                <FaSearch
                    className='text-lg ml-2 cursor-pointer'
                    
                />
            </div>
            <div>
                <h1 
                    className="cursor-pointer" 
                    onClick={()=>{setOpen(!open)}}
                    onMouseEnter={()=>{setOpen(!open)}}
                >Categorias</h1>
            </div>

            <div 
                className={`${style.dropDownMenuCat} ${open ?style.active :style.inactive}`}
                ref={menuRef}
            >
                <ul>
                    <DropdownCategories 
                        text="Todo" 
                        onClick={()=>handleCategoryAll()}
                    />
                    {
                        dataCategories?.map((category,index)=>(
                            <DropdownCategories
                                key={index}
                                text={category}
                                onClick={()=>handleCategory(category)}
                            />
                        ))
                    }
                </ul>
            </div>
            <div>
                <h1>New Post</h1>
            </div>
            <div>
                <h1>My Posts</h1>
            </div>
            <div>
                <h1>Login</h1>
            </div>
        </div>
    )
};

function DropdownCategories(props){
    return(
        <li className='cursor-pointer hover:text-blue-500'
            onClick={props.onClick}
        >
            <a>{props.text}</a>
        </li>
    )
}

export default NavBar;