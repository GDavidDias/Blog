import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {URL} from '../../../varGlobal';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Landing = () => {
    const[validate, setValidate] = useState(true);
    const[msgError, setMsgError] = useState('');
    const[msgButton, setMsgButton] = useState('');
    const[formData, setFormData] = useState({
        username:'',
        password:'',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePage=()=>{
        navigate('/home');
    };

    const submitHandler = async(event)=>{
        console.log('se presiona submit');
        event.preventDefault();
        console.log('que tien form: ', formData);
        console.log('como pasa url: ', URL+'/api/login');

        if(formData.username&&formData.password){
            const {data} = await axios.post(`${URL}/api/login/`,formData);
            console.log('que trae data: ', data);
            const dataUser = {
                username:data.username,
                name:data.name,
                id:data.id,
                token:data.token
            }
            dispatch(setUser(dataUser));
            navigate('/home')
        }
        if(!(formData.username && formData.password)){
            navigate('/home');
        }
    };

    useEffect(()=>{
        console.log('que tiene formData: ', formData);
        if((!formData.username && !formData.password) || (formData.username && formData.password)){
            setValidate(true);
            setMsgError('');
        }else{
            setValidate(false);
            setMsgError('Faltan completar campos')
        }
        if(!formData.username && !formData.password){
            setMsgButton('Ingresar como Invitado')
        }else{
            setMsgButton('Ingresar')
        }
    },[formData],[validate])

    return(
        <div className="w-full h-screen bg-cover bg-center flex flex-col justify-center bg-[url('./images/initial-image.png')]">
            <div 
                className="border-2 p-4 mx-40 bg-blue-800 rounded-lg cursor-pointer"
                onClick={()=>handlePage()}
            >
                <h1 className="text-4xl font-bold text-center text-teal-50 ">Bienvenidos a Blogueros</h1>
            </div>
            <div className="flex flex-col items-center mt-2">
                <form>
                    <div className="flex flex-col items-center mt-4">
                        <input
                            name="username"
                            type="text"
                            placeholder="ingrese usuario..."
                            className="my-3 px-2 py-1"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            name="password"
                            type="text"
                            placeholder="ingrese contraseña..."
                            className="my-3 px-2 py-1"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="h-4">
                    {validate ?<p></p> :<p className="italic text-red-500">{msgError}</p>}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className={`font-bold w-60 h-8 border-2
                                ${(validate)
                                    ?`bg-orange-500 hover:bg-orange-700 text-white`
                                    :`bg-slate-400 hover:bg-slate-400 text-white`
                                }
                            `}
                            disabled={!validate}
                            onClick={submitHandler}
                        >{msgButton}</button>
                    </div>
                </form>
            </div>
        </div>
    )
};
export default Landing;