const {Posts,Category} = require('../db.js');

const listPostsUser = async function(req,res){
    console.log('ingresa a listPostsUser');
    const {id} = req.params;
    try{
        
    }catch(error){
        return res.status(400).send('error en listPostsUser: ', error);
    }
};

module.exports = listPostsUser;