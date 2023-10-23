import style from './NavBar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/pageSlice";

import { useEffect, useState } from "react";
import { setFilterPosts } from '../../redux/postSlice';

const dataCategories = ["Cultura","Deportes","Sociedad","Comidas","Argentina"];

const NavBar = () => {
    const dispatch = useDispatch();

    const[open, setOpen] = useState(false);
    


    const handleBlogueros = () =>{
        dispatch(setPage('InitBlog'))
    };

    const handlePage = (category) => {
        console.log('que tiene menu: ', category);
        //dispatch(setFilterPosts(category));
        
    };

    useEffect(()=>{
        console.log('que valor tiene open: ', open)
    },[open])

    useEffect(()=>{
        setOpen(false);
    },[])

    return(
        <div className="w-full h-[10vh] border-2 bg-slate-100 flex flex-row justify-center items-center space-x-14">
            <div>
                <h1 className="hover:text-blue-500 cursor-pointer "
                    onClick={()=>handleBlogueros()}
                >Blogueros</h1>
            </div>
            <div>
                <input></input>
            </div>
            <div>
                <h1 className="cursor-pointer" onClick={()=>{setOpen(!open)}}>Categorias</h1>
            </div>
            <div 
                className={`${style.dropDownMenuCat} ${open ?style.active :style.inactive}`}
            >
                <ul>
                    {
                        dataCategories?.map((category,index)=>(
                            <DropdownCategories
                                key={index}
                                text={category}
                                onClick={()=>handlePage(category)}
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