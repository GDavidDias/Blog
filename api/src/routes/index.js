const {Router} = require('express');
const listAllPosts = require('../controllers/listAllPosts');
const setDefaultPosts = require('../controllers/setDefaultPosts');
const register = require('../controllers/register');
const login = require('../controllers/login');
const editProfile = require('../controllers/editProfile');
const newPost = require('../controllers/newPost');
const listPostsUser = require('../controllers/listPostsUser');
const getCategories = require('../controllers/getCategories');
const changeStatePost = require('../controllers/changeStatePost');
const editPost = require('../controllers/editPost');


const router = Router();

router.get('/allPosts',listAllPosts);
router.get('/setDefaultPosts',setDefaultPosts);
router.get('/getCategories',getCategories);

//?RUTAS DE USUARIO
//crea perfil
router.post('/register',register);
//login
router.post('/login',login);
//logout

//modifica perfil
router.put('/editProfile/:id', editProfile);



//?RUTAS PARA CRUD DE POST
//crea nuevo post
router.post('/newPost/:id',newPost);

//consulta posts existentes de un usuario
router.get('/listUserPosts/:id',listPostsUser);

//modifica estado de Post Available.
router.put('/changeStatePost/:postId',changeStatePost);

//modifica post existente
router.put('/editPost/:postId',editPost);



module.exports = router;