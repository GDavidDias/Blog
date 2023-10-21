const CardPost = (props) => {
    console.log('que recibe props CardPost: ', props)
    const {Title,Creator,Date,Image,Text} = props;
    return(
        <div className="border-2 w-60 h-72 text-center m-2 p-2">
            <h3 className="text-lg font-bold">{Title}</h3>
            <h3 className="text-sm">{`By ${Creator} / ${Date}`}</h3>
            <img src={Image}/>
            <div className="overflow-hidden w-58 h-16 text-center">
            <p className="text-sm">{Text}</p>
            </div>

        </div>
    )
};

export default CardPost;