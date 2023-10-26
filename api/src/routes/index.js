const {Router} = require('express');
const listAllPosts = require('../controllers/listAllPosts');
const setDefaultPosts = require('../controllers/setDefaultPosts');
const register = require('../controllers/register');
const login = require('../controllers/login');
const editProfile = require('../controllers/editProfile');


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
router.put('/editProfile/:id', editProfile)



//?RUTAS PARA CRUD DE POST
//crea nuevo post
//consulta posts existentes de un usuario
//modifica post existente
//elimina post existente


module.exports = router;