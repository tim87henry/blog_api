const express = require('express');
require('dotenv/config');
var mongoose = require('mongoose');

const app = express();

var mongoDB = process.env.MONGODB_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error',console.error.bind(console, "Mongo DB connection error"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute = require('./routes/users');

app.use('/users', userRoute);

app.get('/', (req, res, next) => {
    res.send("Hmmm vandidhu")
})

app.listen(process.env.PORT, () =>
  console.log('Listening on port '+process.env.PORT),
);