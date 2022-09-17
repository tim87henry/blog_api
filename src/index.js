import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req, res, next) => {
    res.send("Hmmm vandidhu")
})

app.listen(process.env.PORT, () =>
  console.log('Listening on port '+process.env.PORT),
);