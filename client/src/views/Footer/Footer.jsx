import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import {URL} from '../../../varGlobal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

const Footer = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userSG = useSelector((state)=>state.user);
    const[isOpenModal,openModal,closeModal]=useModal(false);
    const[profileData, setProfileData]=useState({
        name:'',
        username:'',
        password:'',
    });

    const[validate, setValidate]=useState(true);
    const[msgError, setMsgError]=useState('');

    const[isMsgOpenModal,MsgopenModal,MsgcloseModal]=useModal(false);

    const handleChangeProfile = (event) => {
        const{name, value} = event.target;
        setProfileData({
            ...profileData,
            [name]:value
        })
    };

    const submitPerfil = async() => {
        console.log('presiono submitPerfil');
        try{
            const response = await axios.put(`${URL}/api/editProfile/${userSG.id}`,profileData);
            console.log('que trae response: ', response);
            setMsgError('')
            setValidate(true);
            closeModal(true);
            MsgopenModal();
            

        }catch(error){
            console.log('que trae error: ', error)
            setMsgError(error.response.data.error)
            setValidate(false);
        }
    };

    const submitAceptar = () => {
        navigate('/');
        MsgcloseModal(true);
    };

    useEffect(()=>{
        console.log('que tiene profileData: ', profileData);
        if(profileData.name && profileData.username && profileData.password){
            setValidate(true);
        }else{
            setValidate(false);
        }
    },[profileData]);

    useEffect(()=>{
        if(userSG.username){
            setProfileData({
                name:userSG.name,
                username:userSG.username,
                password:userSG.password,
            })
        }
    },[]);
    
    return(
        <div className="w-full h-[10vh] border-2 bg-slate-100 p-2 flex justify-center items-center">
            <div className="flex flex-row">
                <div className="w-[80vw] flex flex-row justify-center">
                    {
                        userSG.username
                        ?(
                            <div className="flex flex-row space-x-4">
                                <h1>Autor:</h1>
                                <p
                                    className="text-blue-500 hover:text-blue-800 cursor-pointer"
                                    onClick={()=>openModal()}
                                >{userSG.username}</p>
                            </div>
                        ) : (
                            <div>
                                <h1>Anonimo</h1>
                            </div>
                        )
                    }
                </div>
                <div className="w-[20vw] flex flex-col text-sm text-right pr-8">
                    <h1>Created by</h1>
                    <a 
                        href="https://guillermodias.net.ar/"
                        target="_blank"
                        className="text-blue-500 hover:text-blue-800"
                    >Guillermo David Dias</a>
                </div>
            </div>
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    <div className="flex flex-col items-center mt-6 w-72">
                        <h1 
                            className="text-lg font-bold"
                        >Perfil</h1>
                        <p className="mt-4">Nombre</p>
                        <input
                            className="border-2 px-2 py-1"
                            name="name"
                            type="text"
                            value={profileData.name}
                            onChange={handleChangeProfile}
                        />
                        <p className="mt-4">Usuario</p>
                        <input
                            className="border-2 px-2 py-1"
                            name="username"
                            type="text"
                            value={profileData.username}
                            onChange={handleChangeProfile}
                        ></input>
                        <p className="mt-4">Contraseña</p>
                        <input
                            className="border-2 px-2 py-1"
                            name="password"
                            type="text"
                            value={profileData.password}
                            onChange={handleChangeProfile}
                        ></input>
                        <div className="h-4">
                            {validate ?<p></p> :<p className="italic text-red-500">{msgError}</p> }
                        </div>
                        <button
                            className={`mt-4 font-bold w-40 h-8 border-2
                                ${(validate)
                                    ?`bg-orange-500 hover:bg-orange-700 text-white`
                                    :`bg-slate-400 hover:bg-slate-400 text-white`
                                }
                            `}
                            disabled={!validate}
                            onClick={submitPerfil}
                        >Guardar</button>
                        
                    </div>
            </Modal>
            <Modal isOpen={isMsgOpenModal} >
                    <div className="flex flex-col items-center mt-6 w-72 font-bold space-y-6">
                        
                        <h3
                            className="text-lg text-center"
                        >Usuario actualizado correctamente</h3>
                        <img className='w-40 h-40' src='/images/ok.jpg'></img>
                        <h3
                            className="text-lg text-center"
                        >Vuelva a Iniciar Sesion</h3>
                        <button
                            className="font-bold w-40 h-8 border-2 bg-orange-500 hover:bg-orange-700 text-white"
                            onClick={submitAceptar}
                        >Aceptar</button>
                    </div>
            </Modal>
        </div>
    )
};

export default Footer;