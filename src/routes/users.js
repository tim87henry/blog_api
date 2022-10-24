 var express = require('express');
 var router = express.Router();
 var User = require('../models/user');
 var user_controller = require('../controllers/userController');

 router.get('/', user_controller.find_users);
 router.post('/add', user_controller.add_user);
 router.get('/:id', user_controller.show_user_blogs);
 router.post('/login', user_controller.login_user);

 module.exports = router;