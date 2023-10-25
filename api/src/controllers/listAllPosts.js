const {Posts,Category} = require('../db.js');

const listAllPosts = async function(req,res){
    console.log('ingresa a listAllPosts');
    try{
        const allPosts = await Posts.findAll({
            include:Category,
            });
        //console.log('que trae allPosts: ', allPosts)
        
        //Convierto resultados en objeto JSON
        const jsonData = allPosts.map((post)=>{
            //console.log('que tiene post: ', post);
            return{
                id:post.id,
                Title: post.Title,
                Creator: post.Creator,
                Date: post.Date,
                Image: post.Image,
                Text: post.Text,
                Category: post.categories.map((cat)=>cat.Description),
            };
        });
        console.log('que trae jsonData: ', jsonData)
        return res.status(200).send(jsonData)

    }catch(error){
        return res.status(400).send('error en listAllPosts: ', error)
    }

};

module.exports=listAllPosts;