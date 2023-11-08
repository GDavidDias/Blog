const {Posts,Category} = require('../db.js');

const listPostsUser = async function(req,res){
    console.log('ingresa a listPostsUser');
    const {id} = req.params;
    try{
        const allPostsUser = await Posts.findAll({
            where:{userId:id},
            include:Category,
        })
        console.log('que trae allPostUser: ', allPostsUser);

        //Convierto resultados en JSON
        const jsonData = allPostsUser.map((post)=>{
            return{
                id:post.id,
                Title: post.Title,
                Creator: post.Creator,
                Date: post.Date,
                Image: post.Image,
                Text: post.Text,
                Category: post.categories.map((cat)=>cat.Description),
                Available: post.Available,
            }
        });
        console.log('como convirtio JsonData: ', jsonData);
        return res.status(200).send(jsonData);
    }catch(error){
        return res.status(400).send('error en listPostsUser: ', error);
    }
};

module.exports = listPostsUser;