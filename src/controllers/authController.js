var User = require('../models/user');
const jwt = require('jsonwebtoken');
const util = require('util');

exports.refresh_token =  async (req, res, next) => {

    try {
        console.log("Obtained Cookies are "+util.inspect(req.cookies))
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) return res.sendStatus(401);
        const user = await User.find({refresh_token: refresh_token});
        if (!user) return res.sendStatus(403);
        console.log("passed ck point 1")
        console.log("Obtained Cookies are "+util.inspect(req.cookies))
        jwt.verify(refresh_token, "dogs", (err, decoded) => {
            if (err) return res.sendStatus(403);
            console.log("passed ck point 22 "+util.inspect(user[0]))
            const username = user[0].username;
            const first_name = user[0].first_name;
            const access_token = jwt.sign({username, first_name}, "cats", { expiresIn: "30s"});
            return res.json({access_token, loggedIn: true});
        });
    } catch(err) {
        console.log(err)
    }

};