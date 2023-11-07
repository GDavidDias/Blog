const {Category} = require('../db.js');


const getCategories = async function(req,res){
    console.log('ingresa a getCategories');
    try{
        const allCategories = await Category.findAll({
            attributes: ['Description'],
        });
        if(allCategories){
            //formateo para arreglo de string
            const categoryData = [];
            for(const cat of allCategories){
                categoryData.push(cat.Description);
            }

            return res.status(200).send(categoryData);
        }
        return res.status(401).send('sin datos en tabla Category')

    }catch(error){
        return res.status(404).send('error en getCategories: ', error.message);
    }
};

module.exports = getCategories;