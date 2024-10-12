import express from 'express';
import { user } from '../models/userSchema.js';


const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.socialMediaHandler ||
      !request.body.image
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      name: request.body.name,
      socialMediaHandler: request.body.socialMediaHandler,
      image: request.body.image
  
    };

    const userSchema = await user.create(newBook);

    return response.status(201).send(userSchema);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const users = await user.find({});

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id



export default router;