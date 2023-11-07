const {Router} = require('express');
const listAllPosts = require('../controllers/listAllPosts');
const setDefaultPosts = require('../controllers/setDefaultPosts');
const register = require('../controllers/register');
const login = require('../controllers/login');
const editProfile = require('../controllers/editProfile');
const newPost = require('../controllers/newPost');
const listPostsUser = require('../controllers/listPostsUser');


const router = Router();

router.get('/allPosts',listAllPosts);
router.get('/setDefaultPosts',setDefaultPosts);

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

//modifica post existente
//router.put('/editPost/:postId',);

//deshabilita post existente
//router.put('/deletePost/:postId',);

//Habilita post deshabilitado
//router.put('/enablePost/:postId',);


module.exports = router;