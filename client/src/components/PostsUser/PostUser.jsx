import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {URL} from '../../../varGlobal';
import axios from 'axios';
import { setPosts } from "../../redux/userSlice";
import CardPost from "../CardPost/CardPost";

const PostUser = () => {
    const userSG = useSelector((state)=>state.user);
    const dispatch = useDispatch();

    const getPostsUser = async() =>{
        const idUser = userSG.id;
        const {data} = await axios.get(`${URL}/api/listUserPosts/${idUser}`);
        console.log('que trae data: ', data);
        if(data.length!==0){
            dispatch(setPosts(data));
        }
    };

    //?AL RENDERIZAR
    useEffect(()=>{
        if(userSG.username){
            console.log('esta logueado: ', userSG.username);
            //Si esta logueado, consuta sus Posts Creados
            getPostsUser();
        }else{
            console.log('No esta logueado')
        }
    },[])

    useEffect(()=>{
        console.log('que tiene userSG.posts: ', userSG.posts);
    },[userSG])

    return(
        <div className="w-full h-[80vh] bg-gray-50 p-4 flex flex-wrap">
            {
                userSG.posts?.map((post,index)=>(
                    <CardPost
                        key={index}
                        Id={post.id}
                        Title={post.Title}
                        Creator={post.Creator}
                        Date={post.Date}
                        Image={post.Image}
                        Text={post.Text}
                        Category={post.Category}
                        Available={post.Available}
                        UserId={userSG.id}
                    />
                ))
            }

        </div>
    )
};

export default PostUser;