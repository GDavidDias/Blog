import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {URL} from '../../../varGlobal';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { outUser, setUser } from "../../redux/userSlice";
import {useModal} from '../../hooks/useModal';
import Modal from "../Modal/Modal";


const Landing = () => {
    const[validate, setValidate] = useState(true);
    const[msgError, setMsgError] = useState('');
    const[msgButton, setMsgButton] = useState('');
    const[isOpenModal,openModal,closeModal]=useModal(false);
    const[isMsgOpenModal,MsgopenModal,MsgcloseModal]=useModal(false);
    const[formData, setFormData] = useState({
        username:'',
        password:'',
    });

    const[formRegister, setFormRegister] = useState({
        name:'',
        username:'',
        password:'',
    });
    const[msgErrorRegister, setMsgErrorRegister] = useState('');
    const[validateRegister, setValidateRegister] = useState(true)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };

    const handleChangeRegister = (e) =>{
        const {name,value} = e.target;
        setFormRegister({
            ...formRegister,
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

    const submitRegister = async(event) =>{
        console.log('se presiona registrarse');
        try{
            const {data} = await axios.post(`${URL}/api/register`,formRegister);
            console.log('que trae data -ok register: ', data);
            setMsgErrorRegister('');
            setValidateRegister(true);
            closeModal(true);
            MsgopenModal();
        }catch(error){
            console.log('que trae data -error register: ', error)
            //const msgError = error.response.data.error;
            setMsgErrorRegister(error.response.data.error);
            setValidateRegister(false);
        }

    };

    const submitOpenModal = () =>{
        setFormRegister({name:'',username:'',password:''})
        openModal()
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

    useEffect(()=>{
        console.log('que tiene formRegister: ', formRegister);
        if(formRegister.name && formRegister.username && formRegister.password){
            setValidateRegister(true)
            setMsgErrorRegister('')
        }else{
            setValidateRegister(false)
            setMsgErrorRegister('Faltan completar campos')
        }
    },[formRegister])

    //?AL RENDERIZAR LA PRIMERA VEZ
    useEffect(()=>{
        dispatch(outUser());
    },[])

    return(
        <div className="w-full h-screen bg-cover bg-center flex flex-col justify-center bg-[url('./images/initial-image.png')]">
            <div 
                className="border-2 p-4 mx-40 bg-blue-800 rounded-lg"
                // onClick={()=>handlePage()}
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
                            className={`font-bold w-56 h-8 border-2
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
                <div className="flex justify-center mt-4">
                    <button
                        className="font-bold w-56 h-8 border-2 bg-orange-500 text-white hover:bg-orange-700 cursor-pointer"
                        onClick={submitOpenModal}
                    >Registrarse</button>
                </div>

                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    <div className="flex flex-col items-center mt-6 w-72">
                        <h1 
                            className="font-bold text-lg"
                        >NUEVO USUARIO</h1>
                        <p className="mt-4">Nombre</p>
                        <input
                            className="border-2 px-2 py-1"
                            name="name"
                            type="text"
                            value={formRegister.name}
                            onChange={handleChangeRegister}
                        />
                        <p className="mt-4">Usuario</p>
                        <input
                            className="border-2 px-2 py-1"
                            name="username"
                            type="text"
                            value={formRegister.username}
                            onChange={handleChangeRegister}
                        ></input>
                        <p className="mt-4">Contraseña</p>
                        <input
                            className="border-2 px-2 py-1"
                            name="password"
                            type="text"
                            value={formRegister.password}
                            onChange={handleChangeRegister}
                        ></input>
                        <div className="mt-2 h-4">
                            {validateRegister
                                ?<p></p> 
                                :<p
                                    className="italic text-red-500"
                                >{msgErrorRegister}</p>
                            }
                        </div>
                        <button
                            className={`mt-4 font-bold w-40 h-8 border-2
                                ${(validateRegister)
                                    ?`bg-orange-500 hover:bg-orange-700 text-white`
                                    :`bg-slate-400 hover:bg-slate-400 text-white`
                                }
                            `}
                            onClick={submitRegister}
                            disabled={!validateRegister}
                        >Registrarse</button>
                    </div>
                </Modal>
                <Modal isOpen={isMsgOpenModal} closeModal={MsgcloseModal}>
                    <div className="flex flex-col items-center mt-6 w-72 font-bold space-y-6">
                        <h1 
                            className="text-lg"
                        >Bienvenido a Bloguear!</h1>
                        
                        <img src='/images/welcome.png'></img>
                        <h3
                            className="text-lg text-center"
                        >Inicie sesion con su usuario y contraseña creados</h3>
                    </div>
                </Modal>
            </div>
        </div>
    )
};
export default Landing;