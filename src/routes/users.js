 var express = require('express');
 var router = express.Router();
 var User = require('../models/user');
 var user_controller = require('../controllers/userController');
 const passport = require('passport');

 router.get('/', user_controller.find_users);
 router.post('/add', user_controller.add_user);
 router.get('/:id', user_controller.show_user_blogs);
//  router.post('/login', user_controller.login_user);
 router.post('/login', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log("ERR")
            return next(err);
        }
        if (!user) {
            console.log("NO USER "+info)
            return res.status(401).json(info);
        }
        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return res.json({ token });
    })(req, res, next);
});

 module.exports = router;