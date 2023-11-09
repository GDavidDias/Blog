const {Posts} = require('../db.js');


const editPost = async function(req,res){
    console.log('entra a editPost');
    const{postId}=req.params;
    const {title,creator,date,image,text,available,category} = req.body;
    console.log('que tiene id: ', postId);
    console.log('que tienen title: ', title);
    console.log('que tienen creator: ', creator);
    console.log('que tienen date: ', date);
    console.log('que tienen image: ', image);
    console.log('que tienen text: ', text);
    console.log('que tienen available: ', available);
    console.log('que tienen category: ', category);
    try{
        const editPostData = {
            Title:title,
            Creator:creator,
            Date:date,
            Image:image,
            Text:text,
            Available:available,
        };        
        const postEdited = await Posts.findByPk(postId)
        if(postEdited){
            //?ACTUALIZO DATOS DE POST
            await postEdited.update(editPostData);
            
            return res.status(200).json('Post Actualizado Correctamente en BD'); 
        }else{
            throw new Error('Post no encontrado')
        }

    }catch(error){
        res.status(401).send("Error al Actualizar datos de Post: "+ error.message)
    }
};

module.exports = editPost;