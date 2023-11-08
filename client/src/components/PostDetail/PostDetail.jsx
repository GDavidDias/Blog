import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { URL } from "../../../varGlobal";
import { setPage } from "../../redux/pageSlice";

const PostDetail = (props) => {
    const postDetailSG = useSelector((state)=>state.posts.postDetail);
    const userSG = useSelector((state)=>state.user);
    console.log('que tiene postDetailSG: ', postDetailSG);
    const {Id,Title,Creator,Date,Image,Text} = postDetailSG;
    const[validate, setValidate]=useState(true);
    const dispatch=useDispatch();

    const submitState = async() =>{
        //?Cambia estado
        try{
            const resp = await axios.put(`${URL}/api/changeStatePost/${postDetailSG.Id}`);
            console.log('que trae resp: ', resp);
            dispatch(setPage('InitBlog'));

        }catch(error){
            console.log('error en submitState: ', error);
        }
    };
    
    useEffect(()=>{
        console.log('que tiene userSG.id: ', userSG.id);
        console.log('que tiene postDetailSG.UserId: ', postDetailSG.UserId)
        if(userSG.id===postDetailSG.UserId){
            setValidate(true);
        }else{
            setValidate(false);
        }
    },[])

    return(
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="border-2 w-[86vw] h-[76vh] text-center p-2 flex flex-col items-center">
                <h1 className="text-lg font-bold">{Title}</h1>
                <h3>{`By: ${Creator} / Date: ${Date}`}</h3>
                <img src={Image} className=" h-[60%] flex"/>
                <p className="p-2">{Text}</p>
                <div className="py-2 space-x-4">
                    <button
                        className={`font-bold w-48 h-8 border-2
                        ${(validate)
                            ?`bg-orange-500 hover:bg-orange-700 text-white`
                            :`bg-slate-400 hover:bg-slate-400 text-white`
                            }
                        `}
                        disabled={!validate}
                    >Editar</button>
                    <button
                        className={`font-bold w-48 h-8 border-2
                        ${(validate)
                            ?`bg-orange-500 hover:bg-orange-700 text-white`
                            :`bg-slate-400 hover:bg-slate-400 text-white`
                            }
                        `}
                        disabled={!validate}
                        onClick={submitState}
                    >{
                        postDetailSG.Available!==false
                        ?'Deshabilitar'
                        :'Habilitar'
                    }</button>
                </div>
                

            </div>
        </div>
    )
};

export default PostDetail;