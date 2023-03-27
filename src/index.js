const express = require('express');
require('dotenv/config');
var mongoose = require('mongoose');
const cors = require("cors");
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
require('./passport');
const cookieParser = require('cookie-parser');

const app = express();

var mongoDB = process.env.MONGODB_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error',console.error.bind(console, "Mongo DB connection error"));

app.use(cookieParser());
// app.use(cors({ credentials: true, origin:'http://localhost:3000'}));
app.use(cors({ origin: true , credentials : true}));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:true}));

const userRoute = require('./routes/users');
const blogRoute = require('./routes/blogs');
const commentRoute = require('./routes/comments');
const refreshRoute = require('./routes/refresh');

app.use('/users', userRoute);
app.use('/blogs', blogRoute);
app.use('/comments', commentRoute);
app.use('/refresh', refreshRoute);

app.get('/', (req, res, next) => {
    res.send("Hmmm vandidhu")
})

app.listen(process.env.PORT, () =>
  console.log('Listening on port '+process.env.PORT),
);