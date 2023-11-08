import { useDispatch } from "react-redux";
import { setPage } from "../../redux/pageSlice";
import { setPostDetail } from "../../redux/postSlice";

const CardPost = (props) => {
    console.log('que recibe props CardPost: ', props)
    const {Id,Title,Creator,Date,Image,Text} = props;
    const dispatch = useDispatch();

    const handleImage = () => {
        dispatch(setPage('PostDetail'))
        dispatch(setPostDetail(props))
    };

    return(
        <div className="border-2 w-60 h-72 text-center m-2 p-2">
            <h3 className="text-lg font-bold">{Title}</h3>
            <h3 className="text-sm">{`By ${Creator} / ${Date}`}</h3>
            <div className="w-58 h-40 overflow-hidden">
                <img src={Image} onClick={handleImage} className="cursor-pointer"/>
            </div>
            <div className="overflow-hidden w-58 h-16 text-center">
            <p className="text-sm">{Text}</p>
            </div>

        </div>
    )
};

export default CardPost;