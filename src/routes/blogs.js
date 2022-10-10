var express = require('express');
var router = express.Router();
var blog_controller = require('../controllers/blogController');

router.get('/',  blog_controller.find_all_blogs);
router.post('/add', blog_controller.add_blog);
router.post('/:id/show', blog_controller.show_blog);
router.post('/:id/update', blog_controller.edit_blog);
router.post('/:id/delete', blog_controller.delete_blog);

module.exports = router;