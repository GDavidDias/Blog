const {Posts, User, Category} = require('../db.js');

const newPost = async function(req,res){
    const {id} = req.params;
    const {title,creator,date,image,text,available,category} = req.body;
    console.log('que tiene id: ', id);
    console.log('que tienen title: ', title);
    console.log('que tienen creator: ', creator);
    console.log('que tienen date: ', date);
    console.log('que tienen image: ', image);
    console.log('que tienen text: ', text);
    console.log('que tienen available: ', available);
    console.log('que tienen category: ', category);


    try{
        const newPostData = {
            Title:title,
            Creator:creator,
            Date:date,
            Image:image,
            Text:text,
            Available:available,
        };
        const newCreatedPost = await Posts.create(newPostData);

        //?Asocio al usuario
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        await newCreatedPost.setUser(user);

        //?Asocio a las categorias
        for(const categoryName of category){
            const [cat] = await Category.findOrCreate({
                where:{Description: categoryName}
            });
            await newCreatedPost.addCategory(cat);
        }


        return res.status(201).json({msg:'Post creado exitosamente'});
        //return res.status(201).json(newCreatedPost);

    }catch(error){
        return res.status(401).send('Error en datos newPost: ', error.message);
    }

};

module.exports = newPost;