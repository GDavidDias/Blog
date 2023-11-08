const {Posts} = require('../db.js');

const changeStatePost = async function(req,res){
    console.log('ingresa a changeStatePost')
    const {postId} = req.params;
    console.log('que tiene postId: ', postId)
    try{
        const dataPost = await Posts.findByPk(postId);
        if(dataPost){
            const newstatus = !dataPost.Available;
            console.log('que tiene newStatus: ', newstatus);
            
            const PostsUpdated = await Posts.update(
                {Available:newstatus},
                {where: {id:postId}},
            )

            return res.status(200).send(PostsUpdated);

        }else{
            return res.status(401).send('no se encontro el post')
        }

    }catch(error){
        return res.status(400).send('error en changeStatePost: ', error)
    }
};

module.exports=changeStatePost;