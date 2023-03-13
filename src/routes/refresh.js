var auth_controller = require('../controllers/authController');
var express = require('express');
var router = express.Router();

router.get('/', auth_controller.refresh_token);

module.exports = router;