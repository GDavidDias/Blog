import { useSelector } from "react-redux";

const PostDetail = (props) => {
    const postDetailSG = useSelector((state)=>state.posts.postDetail);
    console.log('que tiene postDetailSG: ', postDetailSG);
    const {Id,Title,Creator,Date,Image,Text} = postDetailSG;

    return(
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="border-2 w-[86vw] h-[76vh] text-center p-2 flex flex-col items-center">
                <h1 className="text-lg font-bold">{Title}</h1>
                <h3>{`By: ${Creator} / Date: ${Date}`}</h3>
                <img src={Image} className=" h-[60%] flex"/>
                <p className="p-2">{Text}</p>
                

            </div>
        </div>
    )
};

export default PostDetail;