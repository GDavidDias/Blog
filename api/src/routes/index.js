const {Router} = require('express');
const listAllPosts = require('../controllers/listAllPosts');
const setDefaultPosts = require('../controllers/setDefaultPosts');


const router = Router();

router.get('/allPosts',listAllPosts);
router.get('/setDefaultPosts',setDefaultPosts);

module.exports = router;