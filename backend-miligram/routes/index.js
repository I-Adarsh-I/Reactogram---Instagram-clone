var express = require('express');
const { signUpHandler, loginHandler } = require('../controllers/user');
var router = express.Router();

router.post('/signup', signUpHandler);
router.post('/login', loginHandler);

module.exports = router;