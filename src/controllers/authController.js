var User = require('../models/user');
const jwt = require('jsonwebtoken');
const util = require('util');

exports.refresh_token =  async (req, res, next) => {

    try {
        try {
            console.log("Cookie is "+(typeof req.cookie.refresh_token === undefined))
            const refresh_token = req.cookie.refresh_token;
        } catch {
            return res.sendStatus(401);
        }
        if (!refresh_token) return res.sendStatus(401);
        const user = await User.find({refresh_token: refresh_token});
        if (!user) return res.sendStatus(403);
        jwt.verify(refresh_token, "dogs", (err, decoded) => {
            if (err) return res.sendStatus(403);
            const username = user.username;
            const first_name = user.first_name;
            const access_token = jwt.sign({username, first_name}, "cats", { expiresIn: "30s"});
            return res.json({access_token, loggedIn: true});
        });
    } catch(err) {
        console.log(err)
    }

};