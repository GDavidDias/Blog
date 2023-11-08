const {Posts, Category} = require('../db.js');

const setDefaultPosts = async function(req,res){
    console.log('ingresa a setDefaultPosts');

    //?SOLO CREA DATOS CUANDO NO HAY CARGADOS EN BD PARA MUESTRA
    try{
        let data;
        data = await require('../data/data.json');

        console.log('que trae resp: ', data);

        let countPosts = await Posts.count();

        if(countPosts===0){
            for(const item of data){
                //Crea un nuevo post
                const post = await Posts.create({
                    Title: item.Title,
                    Creator: item.Creator,
                    Date: item.Date,
                    Image: item.Image,
                    Text: item.Text,
                });
                //Asocio las categorias al post
                for(const categoryName of item.Category){
                    const [category] = await Category.findOrCreate({
                        where:{Description: categoryName}
                    });
                    await post.addCategory(category);
                }
            }
        }

        
        return res.status(200).send(data)

    }catch(error){
        return res.status(404).send('error en setDefaultPosts: ', error.message);
    }
};

module.exports=setDefaultPosts;