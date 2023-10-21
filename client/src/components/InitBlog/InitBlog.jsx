import { useEffect } from "react";
import dataJson from '../../data/data.json';
import { useDispatch, useSelector } from "react-redux";
import CardPost from "../CardPost/CardPost";

const InitBlog = () => {
    const postSG = useSelector((state)=>state.posts.posts)
    
    useEffect(()=>{
        console.log('que tiene postSG: ', postSG);
    },[postSG])

    return(
        <div className="w-full h-[80vh] border-2 bg-gray-50 p-4 flex flex-wrap ">
            {
                postSG?.map((post,index)=>(
                    <CardPost
                        key={index}
                        Title={post.Title}
                        Creator={post.Creator}
                        Date={post.Date}
                        Image={post.Image}
                        Text={post.Text}
                    />
                ))
            }

        </div>
    )
};

export default InitBlog;