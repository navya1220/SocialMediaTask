import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes.js'
import cors from 'cors';
import multer from 'multer';

const app = express();

app.use(express.json());


app.use(cors());
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, '')
  }
})

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/api/students', userRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });