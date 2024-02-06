var express = require('express');
var router = express.Router();
var protectedRoutes = require('../middlewares/protectedRoutes');
const { createPostHandler } = require('../controllers/post');

router.post('/createpost',protectedRoutes, createPostHandler)

module.exports = router;