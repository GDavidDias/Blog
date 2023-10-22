import { useDispatch } from "react-redux";
import { setPage } from "../../redux/pageSlice";

const NavBar = () => {
    const dispatch = useDispatch();

    const handleBlogueros = () =>{
        dispatch(setPage('InitBlog'))
    };

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
                <h1>Categorias</h1>
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

export default NavBar;