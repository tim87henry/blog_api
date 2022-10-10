var express = require('express');
var router = express.Router();
var comment_controller = require('../controllers/commentController');

router.get('/', comment_controller.show_comments);
router.post('/add', comment_controller.add_comment);

module.exports = router;