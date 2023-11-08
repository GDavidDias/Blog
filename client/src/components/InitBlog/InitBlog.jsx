import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPost from "../CardPost/CardPost";
import axios from 'axios';
import {URL} from '../../../varGlobal';
import { deleteAllPosts, setAllPosts } from "../../redux/postSlice";

const InitBlog = () => {
    const postSG = useSelector((state)=>state.posts.filterPosts);
    const dispatch = useDispatch();

    const getAllPost = async() =>{
        try{
          const {data} = await axios.get(`${URL}/api/allPosts`);
          console.log('que trae data getAllPost: ', data);
          dispatch(deleteAllPosts());
          dispatch(setAllPosts(data))
        }catch(error){
          console.log('error en getAllPost: ', error)
        }
      };
    
    useEffect(()=>{
        console.log('que tiene postSG: ', postSG);
    },[postSG]);

    useEffect(()=>{
        getAllPost();
    },[])

    return(
        <div className="w-full h-[80vh] border-2 bg-gray-50 p-4 flex flex-wrap overflow-y-auto">
            {
                postSG
                .filter(post=>post.Available!==false) //?Filtra los post Deshabilitados
                .map((post,index)=>(
                    <CardPost
                        key={index}
                        Id={post.id}
                        Title={post.Title}
                        Creator={post.Creator}
                        Date={post.Date}
                        Image={post.Image}
                        Text={post.Text}
                        Available={post.Available}
                        UserId={post.UserId}
                    />
                ))
            }

        </div>
    )
};

export default InitBlog;