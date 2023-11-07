import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

const NewPostUser = () => {
    const userSG = useSelector((state)=>state.user);
    
    const traeFecha = ()=>{
        //FechaActual
        const fechaActual = new Date();

        //Obtengo año, mes y die
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth()+1).padStart(2,'0'); // Agrega 1 al mes ya que enero es 0 y luego rellena con ceros a la izquierda
        const day = String(fechaActual.getDate()).padStart(2, '0'); // Rellena con ceros a la izquierda si es necesario

        //Formateo fecha en formato que recibe PostgreSQL
        const fechaActualString = `${year}-${month}-${day}`;
        console.log('que tieen fechaActualString: ', fechaActualString)
        
        return fechaActualString;
    };


    const[validate, setValidate]=useState(true);
    const[url_image, setUrl_image]=useState('');
    const[formData, setFormData]=useState({
        title:'',
        creator:'',
        date:'',
        image:'',
        text:'',
    });

    const handleChange=(e)=>{
        const{name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const changeUploadImage = async(event) => {
        const file = event.target.files[0];
        //console.log('que tiene event: ', event);
        
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset','preset_img_blog');

        const response = await axios.post('https://api.cloudinary.com/v1_1/dyttujtxb/image/upload', data);

        setUrl_image(response.data.secure_url);
        setFormData({
            ...formData,
            image:response.data.secure_url
        })
    };    

    useEffect(()=>{
        console.log('que tiene formData: ', formData)
        console.log('que tiene url_image: ', url_image)
        if(formData.title && formData.creator && formData.date && formData.text){
            setValidate(true);
        }else{
            setValidate(false);
        }
    },[formData],[url_image])

    //?AL RENDERIZAR
    useEffect(()=>{
        //cargo datos de creador y fecha del post
        setFormData({
            ...formData,
            creator:userSG.username,
            date:traeFecha()
        })
    },[])

    return(
        <div className="w-full h-[80vh] bg-gray-50 p-4 flex flex-col items-center space-y-4">
            <h1>Nuevo Post de: {userSG.username}</h1>
            {/* //?CONTENEDOR */}
            <div className="border-2 w-full h-[70vh] bg-gray-100 flex flex-col items-center space-y-4">
                {/* //?PARTE SUPERIOR */}
                <div className="w-full flex flex-row">
                    {/* //?PARTE IZQUIERDA TITULOS */}
                    <div className="border-2 w-[15%] flex flex-col text-right pr-2">
                        <p className="py-2">Titulo del Post</p>
                        <p className="py-2">Categoria</p>
                        <p className="py-2">Imagen</p>
                    </div>
                    {/* //?PARTE CENTRO INPUTS */}
                    <div className="border-2 w-[70%] space-y-1">
                        <input
                            className="border-2 px-2 py-1 w-full"
                            type="text"
                            name="title"
                            placeholder="Ingrese titulo del post..."
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <input
                            className="border-2 px-2 py-1 w-full"
                            type="text"
                            name="categoria"
                        />
                        <input
                            className="border-2 px-2 py-1 w-full"
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={changeUploadImage}
                        />
                        
                    </div>
                    {/* //?PARTE DERECHA INPUTS */}
                    <div className="border-2 w-[25%] ">
                    {
                            url_image && (
                                <div>
                                    <img
                                        src={url_image}
                                        className="w-48 h-48 border-2"
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* //?PARTE INFERIOR  */}
                <div  className="w-[95%] h-[60%]">
                    {/* //?DESCRIPCION DEL POST */}
                    <div className="flex flex-col items-center">
                        <p>Descripcion del Post</p>
                        <textarea
                            className="border-2 px-2 py-1 w-full h-72 rounded-md border-blue-800"
                            name="text"
                            placeholder="Ingrese texto del post..."
                            value={formData.text}
                            onChange={handleChange}
                        />
                    </div>
                    {/* //?BOTONES DEL POST */}
                    <div className="flex flex-row justify-center space-x-4 border-2 pt-4">
                        <button
                            className={`font-bold w-48 h-8 border-2
                                ${(validate)
                                    ?`bg-orange-500 hover:bg-orange-700 text-white`
                                    :`bg-slate-400 hover:bg-slate-400 text-white`
                                }
                            `}
                            disabled={!validate}
                            

                        >Guardar</button>
                        <button
                            className="font-bold w-48 h-8 border-2"
                        >Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewPostUser;