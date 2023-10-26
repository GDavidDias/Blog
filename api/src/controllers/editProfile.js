const {User} = require('../db.js');
const bcrypt = require('bcryptjs');

const verificaUserName = async(nombreUsuario) =>{
    const user = await User.findOne({
        where:{
            username:nombreUsuario
        }
    });
    return  user !== null
};

const editProfile = async function(req,res){
    console.log('Entra a editProfile')
    const {username,name,password} = req.body;
    const {id} = req.params;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);
  
    let userObj={username,name,password:passwordHash};

    try{
        //!Si el username ya existe, no se puede actualizar
        //!SI ES NULL no se repite
        const existe= await verificaUserName(username);
        console.log('que trae existe: ', existe)
        if(existe){
            return res.status(400).json({error:'El Usuario ya existe, ingrese otro'});
        };

        console.log('que tiene id: ', id)
        console.log('que tiene username: ', username)
        console.log('que tiene name: ', name)
        console.log('que tiene password: ', password)

        const userEdited = await User.findByPk(id);
        if(userEdited){
            //?ACTUALIZO DATOS DE USUARIO
            await userEdited.update(userObj);
            return res.status(200).json('Usuario Actualizado Correctamente en BD'); 
        }else{
            throw new Error('usuario no encontrado');
        }

    }catch(error){
        res.status(401).send("Error al Actualizar datos de Usuario: "+ error.message)
    }
};

module.exports = editProfile;