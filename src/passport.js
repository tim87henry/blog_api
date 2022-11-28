var User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     console.log("Auth")
//     User.findOne({ username: username }, (err, user) => {
//       if (err) { 
//         res.json({error: err})
//       }
//       if (!user) {
//         console.log("no user")
//         return done(null, false, { message: "Incorrect username" });
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     });
//   })
// );

// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey : 'cats'
//     },
//     function (jwtPayload, cb) {

//         console.log("Passport JS  "+jwtPayload)

//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         return User.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));

passport.use(
    'jwt',
    new JWTStrategy(
        {
            secretOrKey: "cats",
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        (token, done) => {
            console.log("Inside JWT")
            try {
                return done(null, token);
            } catch (error) {
                done(error);
            }
        }
    )
);