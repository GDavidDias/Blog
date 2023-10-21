import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    const handlePage=()=>{
        navigate('/home');
    };

    return(
        <div className="w-full h-screen bg-cover bg-center flex flex-col justify-center bg-[url('./images/initial-image.png')]">
            <div 
                className="border-2 p-4 mx-40 bg-blue-800 rounded-lg cursor-pointer"
                onClick={()=>handlePage()}
            >
                <h1 className="text-4xl font-bold text-center text-teal-50 ">Bienvenidos a Blogueros</h1>
            </div>
        </div>
    )
};
export default Landing;