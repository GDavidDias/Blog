const {Posts, User} = require('../db.js');

const newPost = async function(req,res){
    const {id} = req.params;
    const {title,creator,date,image,text} = req.body;
    console.log('que tiene id: ', id);
    console.log('que tienen title: ', title);
    console.log('que tienen creator: ', creator);
    console.log('que tienen date: ', date);
    console.log('que tienen image: ', image);
    console.log('que tienen text: ', text);

    try{
        const newPostData = {Title:title,Creator:creator,Date:date,Image:image,Text:text};
        const newCreatedPost = await Posts.create(newPostData);

        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        await newCreatedPost.setUser(user);

        return res.status(201).json({msg:'Post creado exitosamente'});

    }catch(error){
        return res.status(401).send('Error en datos newPost: ', error.message);
    }

};

module.exports = newPost;